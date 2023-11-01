import {
  CartService,
  MedusaRequest,
  MedusaResponse,
  OrderService,
} from '@medusajs/medusa';

import {
  addLineItemToCart,
  associateCustomerToCart,
  createCart,
  getCart,
} from '../helpers';

const SHIPPING_METHOD = 'so_01HDK464GWEP31QN6SWA3RP9DQ';

export async function POST(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  try {
    const { cartId } = req.body;

    const orderService: OrderService = req.scope.resolve('orderService');
    const cart = await getCart(cartId);

    const itemsToFulfill = cart.items.map((i) => {
      return { quantity: i.quantity, item_id: i.id };
    });

    let order = await orderService.retrieveByCartId(cartId);

    await orderService.addShippingMethod(order.id, SHIPPING_METHOD);

    await orderService.createFulfillment(order.id, itemsToFulfill);
    order = await orderService.retrieve(order.id);

    res.json({ order });
  } catch (err) {
    res.json({ message: err.message });
  }
}

export const AUTHENTICATE = false;

// questions:
