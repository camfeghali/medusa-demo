import {
  addLineItemToCart,
  associateCustomerToCart,
  createCart,
} from './helpers';

const CUSTOMER_ID = 'cus_01HDK4FJ2G7JRQD18NAPKDMJVK';
const VARIANT_ID = 'variant_01HDK485P11B9RX54V1Z3TGGZ4';

async function main() {
  let cart = await createCart();

  await associateCustomerToCart(cart.id, CUSTOMER_ID);
  await addLineItemToCart(cart.id, VARIANT_ID);

  console.log(cart.id);
}

void main();
