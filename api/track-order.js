
import { adminDb } from '../lib/firebaseAdmin.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed',
    });
  }

  const { reference, email } = req.body || {};

  if (
    typeof reference !== 'string' ||
    typeof email !== 'string' ||
    !reference.trim() ||
    !email.trim()
  ) {
    return res.status(400).json({
      success: false,
      message: 'Order ID and checkout email are required.',
    });
  }

  const orderId = reference
    .trim()
    .replace(/^#/, '')
    .toUpperCase();

  const normalizedEmail = email.trim().toLowerCase();

  if (!/^NBLX-\d+$/.test(orderId)) {
    return res.status(400).json({
      success: false,
      message: 'Enter a valid NBLX order ID, e.g. NBLX-100001.',
    });
  }

  try {
    const snapshot = await adminDb
      .collection('guestOrders')
      .where('orderId', '==', orderId)
      .limit(1)
      .get();

    if (snapshot.empty) {
      return res.status(404).json({
        success: false,
        message: 'Order not found. Check your order ID and email.',
      });
    }

    const document = snapshot.docs[0];
    const order = document.data();

    if (
      String(order.customer?.email || '')
        .trim()
        .toLowerCase() !== normalizedEmail
    ) {
      return res.status(404).json({
        success: false,
        message: 'Order not found. Check your order ID and email.',
      });
    }

    return res.status(200).json({
      success: true,
      order: {
        ...order,
        orderId: order.orderId || order.id,
      },
    });
  } catch (error) {
    console.error('Order tracking error:', error);

    return res.status(500).json({
      success: false,
      message: 'Unable to retrieve this order right now.',
    });
  }
}
