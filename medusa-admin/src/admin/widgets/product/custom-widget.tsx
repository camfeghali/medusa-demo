import { ProductDetailsWidgetProps, WidgetConfig } from '@medusajs/admin';
import {
  Button,
  FocusModal,
  Heading,
  Input,
  Label,
  Textarea,
} from '@medusajs/ui';
import { useState } from 'react';

import Medusa from '@medusajs/medusa-js';

const medusa = new Medusa({ baseUrl: 'http://localhost:9000', maxRetries: 3 });

import { Dispatch, SetStateAction } from 'react';

const ProductWidget = ({ product, notify }: ProductDetailsWidgetProps) => {
  const [localProduct, setProduct] = useState(product);
  return (
    <>
      <div className='bg-white p-8 border border-gray-200 rounded-lg'>
        <div className='flex items-center justify-between'>
          <h1 className='text-grey-90 inter-xlarge-semibold'>
            Custom Attribute
          </h1>
          <EditModal
            product={localProduct}
            setProduct={setProduct}
            notify={notify}
          />
        </div>
        <p>{localProduct.customAttribute || 'What'} </p>
      </div>
    </>
  );
};

interface EditProductProps {
  product: ProductDetailsWidgetProps['product'];
  setProduct: Dispatch<SetStateAction<ProductDetailsWidgetProps['product']>>;
  notify: ProductDetailsWidgetProps['notify'];
}
export function EditModal({ product, setProduct, notify }: EditProductProps) {
  const [edited, setCustomAttribute] = useState(product.customAttribute);

  function save() {
    medusa.admin.products
      .update(product.id, {
        customAttribute: edited,
        status: product.status,
      })
      .then(({ product }) => {
        setOpen(!open);
        setProduct({ ...product, customAttribute: edited });
        notify.success('success', 'Product saved!');
      });
  }

  const [open, setOpen] = useState(false);
  return (
    <FocusModal open={open} onOpenChange={setOpen}>
      <FocusModal.Trigger asChild>
        <Button variant='secondary' size='base'>
          Edit
        </Button>
      </FocusModal.Trigger>
      <FocusModal.Content>
        <FocusModal.Header>
          <Button onClick={save}>Save</Button>
        </FocusModal.Header>
        <FocusModal.Body className='flex flex-col items-center py-16'>
          <div className='flex w-full max-w-lg flex-col gap-y-8'>
            <div className='flex flex-col gap-y-1'>
              <Heading>Edit Custom Attribute</Heading>
              <p>Here you can change this value.</p>
            </div>
            <div className='flex flex-col gap-y-2'>
              <Label htmlFor='key_name' className='text-ui-fg-subtle'>
                Custom Attribute
              </Label>
              <Textarea
                placeholder='Write anything here...'
                value={edited}
                onChange={(e) => setCustomAttribute(e.target.value)}
              />
            </div>
          </div>
        </FocusModal.Body>
      </FocusModal.Content>
    </FocusModal>
  );
}

export const config: WidgetConfig = {
  zone: ['product.details.before'],
};

export default ProductWidget;
