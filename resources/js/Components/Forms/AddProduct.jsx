import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';

export function AddProductForm() {
  const { data, setData, post, errors } = useForm({
    title: '',
    sku: '',
    type: '',
    cost: '',
    price: '',
    stock_management: false,
    autoGenerateSku: true,
  });

  const [step, setStep] = useState(1);

  const handleTypeSelection = (type) => {
    setData('type', type);
    setStep(2);
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    setData('title', title);

    if (data.autoGenerateSku) {
      setData('sku', title.toUpperCase().replace(/\s+/g, '-'));
    }
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('products.store'));
  };

  return (
    <>
      {/* Step 1: Select Product Type */}
      {step === 1 && (
        <div className="space-y-4">
          <h2 className="text-lg font-medium">¿Qué tipo de producto es?</h2>
          <div className="space-y-2">
            <Button
              onClick={() => handleTypeSelection('simple')}
              className="w-full bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]"
            >
              Simple
            </Button>
            <p className="text-sm text-gray-500">Es un producto que solo vendo.</p>

            <Button
              onClick={() => handleTypeSelection('variable')}
              className="w-full bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]"
            >
              Variable
            </Button>
            <p className="text-sm text-gray-500">Es un producto que puede variar en algún atributo del producto, por ejemplo: peso, color, talle, etc.</p>
          </div>
        </div>
      )}

      {/* Step 2: Product Title and SKU */}
      {step === 2 && (
        <div className="space-y-4">
          <h2 className="text-lg font-medium">Detalles del Producto</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700">¿Cuál es el título de tu producto?</label>
            <Input
              type="text"
              value={data.title}
              onChange={handleTitleChange}
              placeholder="Enter product title"
              className="mt-1"
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
          </div>

          <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            <label className="block text-sm font-medium text-gray-700">SKU</label>
            <div className="flex items-center justify-between mt-1">
              <span className="bg-gray-200 px-3 py-2 rounded text-sm text-gray-700">{data.sku}</span>
              <Checkbox
                checked={data.autoGenerateSku}
                onCheckedChange={(checked) => {
                  setData('autoGenerateSku', checked);
                  if (checked) {
                    setData('sku', data.title.toUpperCase().replace(/\s+/g, '-'));
                  }
                }}
                id="autoGenerateSku"
                className="ml-2"
              />
              <label htmlFor="autoGenerateSku" className="ml-2 text-sm font-medium text-gray-700">
                Crear SKU automático
              </label>
            </div>
            {errors.sku && <p className="text-red-500 text-xs mt-1">{errors.sku}</p>}
          </div>

          <Button onClick={nextStep} className="w-full mt-4 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]">
            Siguiente
          </Button>
        </div>
      )}

      {/* Step 3: Pricing and Stock Management */}
      {step === 3 && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-lg font-medium">Pricing and Stock</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700">Cost</label>
            <Input
              type="number"
              value={data.cost}
              onChange={(e) => setData('cost', e.target.value)}
              placeholder="Enter product cost"
              className="mt-1"
            />
            {errors.cost && <p className="text-red-500 text-xs mt-1">{errors.cost}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <Input
              type="number"
              value={data.price}
              onChange={(e) => setData('price', e.target.value)}
              placeholder="Enter product price"
              className="mt-1"
            />
            {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
          </div>

          <div className="flex items-center">
            <Checkbox
              checked={data.stock_management}
              onCheckedChange={(checked) => setData('stock_management', checked)}
              id="stockManagement"
              className="mr-2"
            />
            <label htmlFor="stockManagement" className="text-sm font-medium text-gray-700">
              Enable Stock Management
            </label>
          </div>

          <Separator className="my-4" />

          <div className="flex justify-between">
            <Button onClick={prevStep} className="bg-gray-500 text-white">
              Volver
            </Button>
            <Button type="submit" className="bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]">
              Guardar Producto
            </Button>
          </div>
        </form>
      )}
    </>
  );
}

// Componente principal AddProduct
export default function AddProduct() {
  return (
    <div>
      <AddProductForm />
    </div>
  );
}
