export default async function handler(req, res) {
  const {
    status,
    tx_ref,
    transaction_id,
  } = req.query;

  if (!tx_ref || !transaction_id) {
    return res.redirect(
      302,
      '/checkout?payment=failed'
    );
  }

  if (status !== 'successful') {
    return res.redirect(
      302,
      `/checkout?payment=failed&tx_ref=${encodeURIComponent(
        tx_ref
      )}`
    );
  }

  try {
    if (!process.env.FLW_SECRET_KEY) {
      console.error(
        'FLW_SECRET_KEY is missing'
      );

      return res.redirect(
        302,
        '/checkout?payment=failed'
      );
    }

    const response = await fetch(
      `https://api.flutterwave.com/v3/transactions/${transaction_id}/verify`,
      {
        method: 'GET',

        headers: {
          Authorization:
            `Bearer ${process.env.FLW_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const responseText = await response.text();

    let data;

    try {
      data = responseText
        ? JSON.parse(responseText)
        : null;
    } catch (parseError) {
      console.error(
        'Flutterwave verification returned invalid JSON:',
        responseText
      );

      return res.redirect(
        302,
        `/checkout?payment=failed&tx_ref=${encodeURIComponent(
          tx_ref
        )}`
      );
    }

    if (
      !response.ok ||
      !data ||
      data.status !== 'success'
    ) {
      console.error(
        'Flutterwave verification failed:',
        data
      );

      return res.redirect(
        302,
        `/checkout?payment=failed&tx_ref=${encodeURIComponent(
          tx_ref
        )}`
      );
    }

    const transaction = data.data;

    // ==================================================
    // VERIFY PAYMENT DETAILS
    // ==================================================

    if (
      transaction.status !== 'successful' ||
      transaction.tx_ref !== tx_ref ||
      transaction.currency !== 'NGN'
    ) {
      console.error(
        'Invalid Flutterwave transaction:',
        transaction
      );

      return res.redirect(
        302,
        `/checkout?payment=failed&tx_ref=${encodeURIComponent(
          tx_ref
        )}`
      );
    }

    // ==================================================
    // VERIFY AMOUNT
    // ==================================================

    const paidAmount = Number(
      transaction.amount
    );

    const expectedAmount = Number(
      transaction.meta?.expected_amount
    );

    if (
      !expectedAmount ||
      paidAmount < expectedAmount
    ) {
      console.error(
        'Flutterwave amount mismatch:',
        {
          paidAmount,
          expectedAmount,
        }
      );

      return res.redirect(
        302,
        `/checkout?payment=failed&tx_ref=${encodeURIComponent(
          tx_ref
        )}`
      );
    }

    // ==================================================
    // PAYMENT VERIFIED
    // ==================================================

    return res.redirect(
      302,
      `/order-success?payment=flutterwave&tx_ref=${encodeURIComponent(
        tx_ref
      )}&transaction_id=${encodeURIComponent(
        transaction_id
      )}`
    );
  } catch (error) {
    console.error(
      'Flutterwave verification error:',
      error
    );

    return res.redirect(
      302,
      '/checkout?payment=failed'
    );
  }
}