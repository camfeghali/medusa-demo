import { MedusaRequest, MedusaResponse } from '@medusajs/medusa';

export const AUTHENTICATE = true;

export const GET = (req: MedusaRequest, res: MedusaResponse) => {
  res.json({
    message: '[GET] Hello world!',
  });
};
