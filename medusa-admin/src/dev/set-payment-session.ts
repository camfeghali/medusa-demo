import {
  completeCart,
  createPaymentSession,
  getCart,
  setPaymentSession,
} from '../api/admin/helpers';

const CART_ID = 'cart_01HE580EE9TT6YMNP158107QP1';
const PAYMENT_PROVIDER_ID = 'manual';

async function main() {
  await createPaymentSession(CART_ID);
  await setPaymentSession(CART_ID, PAYMENT_PROVIDER_ID);

  await completeCart(CART_ID);

  let cart = await getCart(CART_ID);

  console.log(JSON.stringify(cart, null, 2));
}

void main();
