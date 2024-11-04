import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";
import { Separator } from "@/Components/ui/separator";
import {
  SidebarInset,
  SidebarTrigger,
} from "@/Components/ui/sidebar";
import { Button } from "@/Components/ui/button";

export default function View({ auth, product }) {
  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Ver producto" />

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
                <BreadcrumbPage className="text-foreground">Ver producto</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <div className="flex-1 flex flex-col gap-4 p-4 pt-0 bg-background">
          <div className="rounded-xl p-6 flex flex-col gap-4 w-full h-full">
            <h2 className="text-xl font-semibold text-foreground mb-4">Detalles del producto</h2>

            {/* Título */}
            <div>
              <label className="block text-sm font-medium">Título del Producto</label>
              <p className="text-sm text-foreground">{product.title}</p>
            </div>

            {/* Descripción */}
            <div>
              <label className="block text-sm font-medium">Descripción del Producto</label>
              <p className="text-sm text-foreground">{product.description}</p>
            </div>

            {/* SKU */}
            <div>
              <label className="block text-sm font-medium">SKU</label>
              <p className="text-sm text-foreground">{product.sku}</p>
            </div>

            {/* Tipo */}
            <div>
              <label className="block text-sm font-medium">Tipo de Producto</label>
              <p className="text-sm text-foreground">{product.type}</p>
            </div>

            {/* Costo */}
            <div>
              <label className="block text-sm font-medium">Costo</label>
              <p className="text-sm text-foreground">${product.cost}</p>
            </div>

            {/* Precio */}
            <div>
              <label className="block text-sm font-medium">Precio</label>
              <p className="text-sm text-foreground">${product.price}</p>
            </div>

            {/* Gestión de Inventario */}
            <div>
              <label className="block text-sm font-medium">Gestión de Inventario</label>
              <p className="text-sm text-foreground">
                {product.stock_management ? "Activado" : "Desactivado"}
              </p>
            </div>

            {/* Imágenes */}
            <div>
              <label className="block text-sm font-medium">Imágenes</label>
              <div className="space-y-2">
                {product.images && product.images.length > 0 ? (
                  product.images.map((image, index) => (
                    <div key={index}>
                      <a href={image} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-foreground">
                        {image}
                      </a>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-foreground">No hay imágenes disponibles</p>
                )}
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex gap-4 mt-4">
              <Link href={`/product/edit/${product.id}`}>
                <Button variant="primary">Editar producto</Button>
              </Link>
              <Link href={`/product/delete/${product.id}`}>
                <Button variant="destructive">Eliminar producto</Button>
              </Link>
            </div>

          </div>
        </div>
      </SidebarInset>
    </AuthenticatedLayout>
  );
}
