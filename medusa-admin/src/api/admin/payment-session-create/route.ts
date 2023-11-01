import { MedusaRequest, MedusaResponse } from '@medusajs/medusa';
import {
  addLineItemToCart,
  associateCustomerToCart,
  createCart,
  getCart,
} from 'src/dev/helpers';

const CUSTOMER_ID = 'cus_01HDK4FJ2G7JRQD18NAPKDMJVK';
const VARIANT_ID = 'variant_01HDK485P11B9RX54V1Z3TGGZ4';

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  try {
    let cart = await createCart();

    await associateCustomerToCart(cart.id, CUSTOMER_ID);
    await addLineItemToCart(cart.id, VARIANT_ID);

    cart = await getCart(cart.id);
    res.json({
      cart,
    });
  } catch (err) {
    res.json({
      err,
    });
  }
};

// export const AUTHENTICATE = false;
export const AUTHENTICATE = false;
