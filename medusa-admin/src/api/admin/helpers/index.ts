import { medusaClient as medusa } from './client';

export async function completeCart(cartId: string) {
  await medusa().carts.complete(cartId);
}
export async function setPaymentSession(cartId: string, providerId: string) {
  await medusa().carts.setPaymentSession(cartId, {
    provider_id: providerId,
  });
}

export async function createPaymentSession(cartId: string) {
  return await medusa().carts.createPaymentSessions(cartId);
}

export async function addLineItemToCart(cartId: string, variantId: string) {
  medusa().carts.lineItems.create(cartId, {
    variant_id: variantId,
    quantity: 3,
  });
}

export async function associateCustomerToCart(
  cartId: string,
  customerId: string
) {
  await medusa().carts.update(cartId, {
    customer_id: customerId,
  });
}

export async function getCart(id: string) {
  return (await medusa().carts.retrieve(id)).cart;
}

export async function createCart() {
  const { cart } = await medusa().carts.create();
  return cart;
}
