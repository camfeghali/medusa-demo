import { MedusaRequest, MedusaResponse } from '@medusajs/medusa';

import {
  completeCart,
  createPaymentSession,
  getCart,
  setPaymentSession,
} from '../helpers';

import { medusaClient } from '../helpers/client';
import { OrderService, PaymentService } from '@medusajs/medusa/dist/services';

const PAYMENT_PROVIDER_ID = 'manual';

export async function POST(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  try {
    const { cartId } = req.body;

    const paymentService: PaymentService = req.scope.resolve('paymentService');
    const orderService: OrderService = req.scope.resolve('orderService');

    await createPaymentSession(cartId);
    await setPaymentSession(cartId, PAYMENT_PROVIDER_ID);
    let cart = await getCart(cartId);

    const paymentSessionId = cart.payment_session.id;

    await completeCart(cartId);

    const order = await orderService.retrieveByCartId(cartId);

    orderService.capturePayment(order.id);
    // medusaClient().admin.payments.capturePayment(paymentSessionId);

    // console.log(paymentService.capture());

    res.json({ cart });
    res.send(200);
  } catch (err) {
    // console.log(err);
    res.json({ message: err.message });
  }
}

export const AUTHENTICATE = false;
