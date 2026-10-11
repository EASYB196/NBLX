// export default async function handler(req, res) {

//   if (req.method !== 'POST') {
//     return res.status(405).json({
//       message: 'Method not allowed',
//     });
//   }

//   const { reference } = req.body;

//   if (!reference) {
//     return res.status(400).json({
//       message: 'Transaction reference is required',
//     });
//   }

//   try {
//     const response = await fetch(
//       `https://api.paystack.co/transaction/verify/${reference}`,
//       {
//         method: 'GET',
//         headers: {
//           Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
//           'Content-Type': 'application/json',
//         },
//       }
//     );

//     const data = await response.json();

//     if (!response.ok || !data.status) {
//       return res.status(400).json({
//         message: 'Payment verification failed',
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       data: data.data,
//     });
//   } catch (error) {
//     console.error('Payment verification error:', error);

//     return res.status(500).json({
//       message: 'Server error while verifying payment',
//     });
//   }
// }

// api/verify-payment.js



import { adminDb, adminAuth } from '../lib/firebaseAdmin.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed',
    });
  }

  const { reference, customerDetails, items, expectedAmount } = req.body || {};

  if (typeof reference !== 'string' || !/^[a-zA-Z0-9_-]+$/.test(reference)) {
    return res.status(400).json({
      success: false,
      message: 'A valid payment reference is required.',
    });
  }

  if (
    !customerDetails?.fullName ||
    !customerDetails?.email ||
    !customerDetails?.phone ||
    !customerDetails?.address ||
    !Array.isArray(items) ||
    items.length === 0 ||
    !Number.isFinite(Number(expectedAmount)) ||
    Number(expectedAmount) <= 0
  ) {
    return res.status(400).json({
      success: false,
      message: 'Complete order information is required.',
    });
  }

  if (!process.env.PAYSTACK_SECRET_KEY) {
    return res.status(500).json({
      success: false,
      message: 'Payment verification is not configured.',
    });
  }

  try {
    // Verify the customer's Firebase identity if they are logged in.
    let userId = null;

    const authorization = req.headers.authorization || '';

    if (authorization.startsWith('Bearer ')) {
      const idToken = authorization.slice(7).trim();

      if (!idToken) {
        return res.status(401).json({
          success: false,
          message: 'Invalid authentication token.',
        });
      }

      try {
        const decodedToken = await adminAuth.verifyIdToken(idToken);
        userId = decodedToken.uid;
      } catch {
        return res.status(401).json({
          success: false,
          message: 'Your session could not be verified. Please sign in again.',
        });
      }
    }

    // Verify payment directly with Paystack.
    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      },
    );

    const result = await response.json();
    const payment = result.data;

    if (
      !response.ok ||
      !result.status ||
      payment?.status !== 'success' ||
      payment?.reference !== reference ||
      payment?.currency !== 'NGN' ||
      payment?.amount !== Math.round(Number(expectedAmount) * 100)
    ) {
      return res.status(400).json({
        success: false,
        message: 'Payment verification failed. Please contact support.',
      });
    }

    const email = String(payment.customer?.email || '')
      .trim()
      .toLowerCase();

    if (!email || email !== String(customerDetails.email).trim().toLowerCase()) {
      return res.status(400).json({
        success: false,
        message: 'The payment email does not match the checkout email.',
      });
    }

    const safeItems = items.map((item, index) => ({
      id: String(item.id || index),
      name: String(item.name || 'NBLX Product'),
      color: String(item.selectedColor || item.color || 'Default'),
      size: String(item.selectedSize || item.size || ''),
      quantity: Math.max(1, Math.floor(Number(item.quantity) || 1)),
      price: Math.max(0, Number(item.price) || 0),
      image: String(item.image || item.images?.[0] || ''),
    }));

    const orderRef = adminDb.collection('guestOrders').doc(reference);
    const counterRef = adminDb.collection('systemCounters').doc('orders');

    const savedOrder = await adminDb.runTransaction(async (transaction) => {
      // Complete every read before performing any writes.
      const existingSnapshot = await transaction.get(orderRef);
      const counterSnapshot = await transaction.get(counterRef);

      let userOrderRef = null;
      let userOrderSnapshot = null;

      if (userId) {
        userOrderRef = adminDb
          .collection('userOrders')
          .doc(userId)
          .collection('orders')
          .doc(reference);

        userOrderSnapshot = await transaction.get(userOrderRef);
      }

      let order;

      if (existingSnapshot.exists) {
        order = existingSnapshot.data();

        // The same payment reference must never belong to two accounts.
        if (
          String(order.customer?.email || '')
            .trim()
            .toLowerCase() !== email ||
          (order.userId && order.userId !== userId && userId)
        ) {
          throw new Error('ORDER_REFERENCE_CONFLICT');
        }

        // Attach an existing guest order to this authenticated account
        // when it has not already been assigned to a different account.
        if (userId && !order.userId) {
          order = { ...order, userId };
          transaction.set(orderRef, order);
        }
      } else {
        const previousNumber = counterSnapshot.exists
          ? Number(counterSnapshot.data().lastNumber) || 100000
          : 100000;

        const nextNumber = previousNumber + 1;
        const orderId = `NBLX-${nextNumber}`;

        order = {
          id: orderId,
          orderId,
          reference,
          userId,
          customer: {
            name: String(customerDetails.fullName).trim(),
            email,
            phone: String(customerDetails.phone).trim(),
            address: String(customerDetails.address).trim(),
          },
          items: safeItems,
          total: payment.amount / 100,
          currency: payment.currency,
          paymentProvider: 'Paystack',
          paymentStatus: 'success',
          status: 'Processing',
          statusKey: 'processing',
          shipping: 0,
          createdAt: new Date(
            payment.paid_at || payment.created_at || Date.now(),
          ).toISOString(),
        };

        transaction.set(counterRef, { lastNumber: nextNumber });
        transaction.set(orderRef, order);
      }

      // Save an additional copy for authenticated customers.
      if (userId) {
        if (userOrderSnapshot?.exists && userOrderSnapshot.data().reference !== reference) {
          throw new Error('ORDER_REFERENCE_CONFLICT');
        }

        transaction.set(userOrderRef, order);
      }

      return order;
    });

    return res.status(200).json({
      success: true,
      message: 'Payment verified and order saved.',
      order: savedOrder,
      orderId: savedOrder.orderId,
    });
  } catch (error) {
    if (error.message === 'ORDER_REFERENCE_CONFLICT') {
      return res.status(409).json({
        success: false,
        message: 'This order reference is already registered.',
      });
    }

    console.error('Payment verification error:', error);

    return res.status(500).json({
      success: false,
      message: 'Unable to verify and save this order.',
    });
  }
}
