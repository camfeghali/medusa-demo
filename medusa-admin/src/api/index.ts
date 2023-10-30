import { registerOverriddenValidators } from '@medusajs/medusa';
import { AdminPostProductsProductReq as MedusaAdminPostProductsReq } from '@medusajs/medusa/dist/api/routes/admin/products/update-product';
import { IsString } from 'class-validator';

class AdminPostProductsProductReq extends MedusaAdminPostProductsReq {
  @IsString()
  customAttribute: string;
}

registerOverriddenValidators(AdminPostProductsProductReq);
