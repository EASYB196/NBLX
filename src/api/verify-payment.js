

export default async function handler(req, res) {

    
  if (req.method !== 'POST') {
    return res.status(405).json({
      message: 'Method not allowed',
    });
  }

  const { reference } = req.body;

  if (!reference) {
    return res.status(400).json({
      message: 'Transaction reference is required',
    });
  }

  try {
    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const data = await response.json();

    if (!response.ok || !data.status) {
      return res.status(400).json({
        message: 'Payment verification failed',
      });
    }

    return res.status(200).json({
      success: true,
      data: data.data,
    });
  } catch (error) {
    console.error('Payment verification error:', error);

    return res.status(500).json({
      message: 'Server error while verifying payment',
    });
  }
}
