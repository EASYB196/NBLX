export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed',
    });
  }

  try {
    const { amount, customerDetails } = req.body || {};

    if (!amount || !customerDetails) {
      return res.status(400).json({
        success: false,
        message: 'Amount and customer details are required',
      });
    }

    const {
      fullName,
      email,
      phone,
      address,
    } = customerDetails;

    if (!fullName || !email || !phone || !address) {
      return res.status(400).json({
        success: false,
        message: 'Complete customer details are required',
      });
    }

    if (!process.env.FLW_SECRET_KEY) {
      console.error('FLW_SECRET_KEY is missing');

      return res.status(500).json({
        success: false,
        message: 'Flutterwave secret key is not configured.',
      });
    }

    const txRef = `NBLX-FLW-${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase()}`;

    const baseUrl =
      process.env.SITE_URL ||
      'http://localhost:5173';

    const redirectUrl =
      `${baseUrl}/api/flutterwave-callback`;

    console.log('Flutterwave redirect URL:', redirectUrl);

    const response = await fetch(
      'https://api.flutterwave.com/v3/payments',
      {
        method: 'POST',
        headers: {
          Authorization:
            `Bearer ${process.env.FLW_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tx_ref: txRef,
          amount: Number(amount),
          currency: 'NGN',
          redirect_url: redirectUrl,

          customer: {
            email: email.trim(),
            name: fullName.trim(),
            phonenumber: phone.trim(),
          },

          customizations: {
            title: 'NBLX Fashion',
            description: 'NBLX Order Payment',
          },

          meta: {
            delivery_address: address.trim(),
            customer_phone: phone.trim(),
            customer_email: email.trim(),
            expected_amount: Number(amount),
          },
        }),
      }
    );

    const responseText = await response.text();

    console.log(
      'Flutterwave status:',
      response.status
    );

    console.log(
      'Flutterwave response:',
      responseText
    );

    let data = null;

    try {
      data = responseText
        ? JSON.parse(responseText)
        : null;
    } catch {
      return res.status(502).json({
        success: false,
        message:
          'Flutterwave returned an invalid response.',
      });
    }

    if (
      !response.ok ||
      !data ||
      data.status !== 'success' ||
      !data.data?.link
    ) {
      console.error(
        'Flutterwave initialization error:',
        data
      );

      return res.status(response.status || 400).json({
        success: false,
        message:
          data?.message ||
          'Unable to initialize Flutterwave payment.',
      });
    }

    return res.status(200).json({
      success: true,
      link: data.data.link,
      tx_ref: txRef,
    });
  } catch (error) {
    console.error(
      'Flutterwave payment error:',
      error
    );

    return res.status(500).json({
      success: false,
      message:
        'Server error while initializing Flutterwave payment.',
    });
  }
}