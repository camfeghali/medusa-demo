import { MedusaRequest, MedusaResponse } from '@medusajs/medusa';
import { listShippingMethods } from '../helpers';
export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  const options = await listShippingMethods('cart_01HE5P5WWWZG1598KM5BR2E1ZB');
  res.json({ options });
}

export const AUTHENTICATE = false;
