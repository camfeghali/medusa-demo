import { MedusaRequest, MedusaResponse } from '@medusajs/medusa';

import {
  addLineItemToCart,
  associateCustomerToCart,
  createCart,
  getCart,
  setShippingMethod,
  updateCart,
} from '../helpers';

const CUSTOMER_ID = 'cus_01HDK4FJ2G7JRQD18NAPKDMJVK';
const VARIANT_ID = 'variant_01HDK485P11B9RX54V1Z3TGGZ4';

const shippingAddress = {
  shipping_address: {
    company: 'PD',
    first_name: 'Dog',
    last_name: 'CEO',
    address_1: 'Winnstr 62',
    city: 'Berlin',
    country_code: 'de',
    province: 'Berlin',
    postal_code: '11232',
  },
};

export async function POST(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  try {
    let cart = await createCart();
    await updateCart(cart.id, { ...shippingAddress });
    await associateCustomerToCart(cart.id, CUSTOMER_ID);
    await addLineItemToCart(cart.id, VARIANT_ID);

    cart = await getCart(cart.id);

    res.json({ cart });
  } catch (err) {
    res.json({ message: err.message });
  }
}

export const AUTHENTICATE = false;
