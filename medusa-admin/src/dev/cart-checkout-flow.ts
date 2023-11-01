import Medusa from '@medusajs/medusa-js';
import { setTimeout } from 'timers/promises';

const medusa = new Medusa({
  maxRetries: 3,
  baseUrl: 'http://localhost:9000',
});

const CART_ID = 'cart_01HE33NYAWMR0M6WEKYRRFHFPN';
const CUSTOMER_ID = 'cus_01HDK4FJ2G7JRQD18NAPKDMJVK';
const VARIANT_ID = 'variant_01HDK485P11B9RX54V1Z3TGGZ4';
const PAYMENT_PROVIDER_ID = 'manual';

async function main() {
  //   let cart = await getCart(CART_ID);
  let cart = await createCart();

  await associateCustomerToCart(cart.id, CUSTOMER_ID);
  await addLineItemToCart(cart.id, VARIANT_ID);

  await createPaymentSession(cart.id);

  await setTimeout(5000);

  await setPaymentSession(cart.id, PAYMENT_PROVIDER_ID);

  await completeCart(cart.id);

  cart = await getCart(cart.id);

  console.log(JSON.stringify(cart, null, 2));
}

void main();

async function completeCart(cartId: string) {
  await medusa.carts.complete(cartId);
}
async function setPaymentSession(cartId: string, providerId: string) {
  await medusa.carts.setPaymentSession(cartId, {
    provider_id: providerId,
  });
}

async function createPaymentSession(cartId: string) {
  return await medusa.carts.createPaymentSessions(cartId);
}

async function addLineItemToCart(cartId: string, variantId: string) {
  medusa.carts.lineItems.create(cartId, {
    variant_id: variantId,
    quantity: 3,
  });
}

async function associateCustomerToCart(cartId: string, customerId: string) {
  await medusa.carts.update(cartId, {
    customer_id: customerId,
  });
}

async function getCart(id: string) {
  return (await medusa.carts.retrieve(id)).cart;
}

async function createCart() {
  const { cart } = await medusa.carts.create();
  return cart;
}
