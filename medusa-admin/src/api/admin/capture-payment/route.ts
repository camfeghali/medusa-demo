import { MedusaRequest, MedusaResponse } from '@medusajs/medusa';

import { completeCart } from '../helpers';

import { OrderService } from '@medusajs/medusa/dist/services';

export async function POST(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  try {
    const { cartId } = req.body;

    const orderService: OrderService = req.scope.resolve('orderService');

    await completeCart(cartId);

    const order = await orderService.retrieveByCartId(cartId);

    orderService.capturePayment(order.id);

    res.send(200);
  } catch (err) {
    // console.log(err);
    res.json({ message: err.message });
  }
}

export const AUTHENTICATE = false;
