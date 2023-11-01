import { MedusaRequest, MedusaResponse } from '@medusajs/medusa';
import { log } from '../../test';
export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  log();
  res.sendStatus(200);
}

export const AUTHENTICATE = false;
