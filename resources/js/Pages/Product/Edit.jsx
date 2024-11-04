// resources/js/Pages/Products/Edit.jsx

import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select } from "@/components/ui/select";

export default function Edit({ auth, product }) {
  const { data, setData, patch, errors } = useForm({
    title: product.title,
    sku: product.sku,
    type: product.type,
    parent_sku: product.parent_sku,
    cost: product.cost,
    price: product.price,
    stock_management: product.stock_management,
    images: product.images || [],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    patch(route('products.update', product.id));
  };

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Editar producto" />

      <SidebarInset>
        <header className="flex h-16 items-center gap-2 bg-background text-foreground px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4 text-border" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <Link href="/dashboard" className="text-primary hover:text-primary-foreground">
                  Dashboard
                </Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block text-muted-foreground" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-foreground">Editar producto</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <div className="flex-1 flex flex-col gap-4 p-4 pt-0 bg-background">
          <div className="rounded-xl p-6 flex flex-col gap-4 w-full h-full">
            <h2 className="text-xl font-semibold text-foreground mb-4">Editar producto</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Title */}
              <div>
                <Input
                  label="Title"
                  value={data.title}
                  onChange={(e) => setData('title', e.target.value)}
                  error={errors.title}
                  placeholder="Product Title"
                />
              </div>

              {/* SKU */}
              <div>
                <Input
                  label="SKU"
                  value={data.sku}
                  onChange={(e) => setData('sku', e.target.value)}
                  error={errors.sku}
                  placeholder="SKU"
                />
              </div>

              {/* Type */}
              <div>
                <label>Type</label>
                <Select
                  value={data.type}
                  onChange={(e) => setData('type', e.target.value)}
                >
                  <option value="simple">Simple</option>
                  <option value="variable">Variable</option>
                  <option value="variation">Variation</option>
                </Select>
                {errors.type && <div className="text-red-600">{errors.type}</div>}
              </div>

              {/* Parent SKU */}
              <div>
                <Input
                  label="Parent SKU"
                  value={data.parent_sku}
                  onChange={(e) => setData('parent_sku', e.target.value)}
                  error={errors.parent_sku}
                  placeholder="Parent SKU"
                />
              </div>

              {/* Cost */}
              <div>
                <Input
                  label="Cost"
                  type="number"
                  step="0.01"
                  value={data.cost}
                  onChange={(e) => setData('cost', e.target.value)}
                  error={errors.cost}
                  placeholder="Cost"
                />
              </div>

              {/* Price */}
              <div>
                <Input
                  label="Price"
                  type="number"
                  step="0.01"
                  value={data.price}
                  onChange={(e) => setData('price', e.target.value)}
                  error={errors.price}
                  placeholder="Price"
                />
              </div>

              {/* Stock Management */}
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={data.stock_management}
                  onCheckedChange={(checked) => setData('stock_management', checked)}
                  id="stock_management"
                />
                <label htmlFor="stock_management" className="text-sm">
                  Stock Management
                </label>
                {errors.stock_management && <div className="text-red-600">{errors.stock_management}</div>}
              </div>

              {/* Images */}
              <div>
                <label>Images (URLs)</label>
                <div className="space-y-2">
                  {data.images.map((image, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        type="url"
                        value={image}
                        onChange={(e) => {
                          const newImages = [...data.images];
                          newImages[index] = e.target.value;
                          setData('images', newImages);
                        }}
                        placeholder="Image URL"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        onClick={() => {
                          const newImages = data.images.filter((_, i) => i !== index);
                          setData('images', newImages);
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setData('images', [...data.images, ''])}
                  >
                    Add Image
                  </Button>
                </div>
                {errors.images && <div className="text-red-600">{errors.images}</div>}
              </div>

              {/* Submit Button */}
              <Button type="submit">Actualizar producto</Button>
            </form>
          </div>
        </div>
      </SidebarInset>
    </AuthenticatedLayout>
  );
}