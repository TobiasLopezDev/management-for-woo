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
import { AddProductForm } from '@/components/Forms/AddProduct';

export default function CreateProduct({ auth }) {
  const { data, setData, post, errors } = useForm({
    title: '',
    sku: '',
    type: 'simple',
    parent_sku: '',
    cost: '',
    price: '',
    stock_management: false,
    images: [],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('products.store'), { data });
  };

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Crear Producto" />

      <SidebarInset>
        {/* Header */}
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
                <BreadcrumbPage className="text-foreground">Crear Producto</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        {/* Main Content - Full Width Form */}
        <div className="flex-1 flex flex-col gap-4 p-4 pt-0 bg-background">
          <div className="rounded-xl p-6 flex flex-col gap-4 w-full h-full">
            <h2 className="text-xl font-semibold text-foreground mb-4">Crea tu nuevo producto</h2>

            {/* Formulario de producto */}
            <AddProductForm
              data={data}
              setData={setData}
              onSubmit={handleSubmit}
              errors={errors}
            />
          </div>
        </div>
      </SidebarInset>
    </AuthenticatedLayout>
  );
}
