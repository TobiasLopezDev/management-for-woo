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
import ProductTable from '@/Components/productTable';

export default function Index({ auth }) {
  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Listado de productos" />

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
                <BreadcrumbPage className="text-foreground">Todos los productos</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        {/* Main Content - Full Width Form */}
        <div className="flex-1 flex flex-col gap-4 p-4 pt-0 bg-background">
          <div className="rounded-xl p-6 flex flex-col gap-4 w-full h-full">
            <h2 className="text-xl font-semibold text-foreground mb-4">Todos tus productos</h2>

            {/* Formulario de producto */}
            <ProductTable
            />
          </div>
        </div>
      </SidebarInset>
    </AuthenticatedLayout>
  );
}
