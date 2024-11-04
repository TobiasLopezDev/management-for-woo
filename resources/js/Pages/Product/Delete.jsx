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

export default function Delete({ auth, product }) {
  const { delete: destroy, processing } = useForm();

  const handleDelete = (e) => {
    e.preventDefault();
    destroy(route('products.destroy', product.id));
  };

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Eliminar producto" />

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
                <BreadcrumbPage className="text-foreground">Eliminar producto</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <div className="flex-1 flex flex-col gap-4 p-4 pt-0 bg-background">
          <div className="rounded-xl p-6 flex flex-col gap-4 w-full h-full">
            <h2 className="text-xl font-semibold text-foreground mb-4">Eliminar producto</h2>
            <p className="text-sm text-foreground">
              ¿Estás seguro de que deseas eliminar el producto <strong>{product.title}</strong>?
              Esta acción no se puede deshacer.
            </p>

            {/* Información del Producto */}
            <div className="mt-4">
              <label className="block text-sm font-medium">Título del Producto</label>
              <p className="text-sm text-foreground">{product.title}</p>
            </div>
            <div>
              <label className="block text-sm font-medium">SKU</label>
              <p className="text-sm text-foreground">{product.sku}</p>
            </div>
            <div>
              <label className="block text-sm font-medium">Precio</label>
              <p className="text-sm text-foreground">${product.price}</p>
            </div>

            {/* Botones de Acción */}
            <div className="flex gap-4 mt-6">
              <Link href={route('products.index')}>
                <Button variant="secondary">Cancelar</Button>
              </Link>
              <Button onClick={handleDelete} variant="destructive" disabled={processing}>
                {processing ? "Eliminando..." : "Eliminar producto"}
              </Button>
            </div>
          </div>
        </div>
      </SidebarInset>
    </AuthenticatedLayout>
  );
}
