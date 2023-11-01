import { MedusaRequest, MedusaResponse } from '@medusajs/medusa';

import { createPaymentSession, getCart, setPaymentSession } from '../helpers';

const PAYMENT_PROVIDER_ID = 'manual';

export async function POST(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  try {
    const { cartId } = req.body;

    await createPaymentSession(cartId);
    await setPaymentSession(cartId, PAYMENT_PROVIDER_ID);

    let cart = await getCart(cartId);
    res.json({ cart });
    res.send(200);
  } catch (err) {
    // console.log(err);
    res.json({ message: err.message });
  }
}

export const AUTHENTICATE = false;
