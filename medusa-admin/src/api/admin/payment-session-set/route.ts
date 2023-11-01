import { MedusaRequest, MedusaResponse } from '@medusajs/medusa';
import {
  completeCart,
  createPaymentSession,
  getCart,
  setPaymentSession,
} from 'src/dev/helpers';
import { PaymentService } from 'medusa-interfaces';

const PAYMENT_PROVIDER_ID = 'manual';

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  const paymentService: PaymentService = req.scope.resolve('paymentService');
  try {
    const { cartId } = req.body;
    console.log({ cartId });
    await createPaymentSession(cartId);
    await setPaymentSession(cartId, PAYMENT_PROVIDER_ID);

    await completeCart(cartId);

    paymentService.capturePayment();

    let cart = await getCart(cartId);

    res.json({
      cart,
    });
  } catch (err) {
    res.json({
      err,
    });
  }
};

export const AUTHENTICATE = false;
