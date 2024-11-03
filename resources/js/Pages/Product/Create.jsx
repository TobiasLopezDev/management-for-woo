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

import { AddProductForm } from '@/Components/Forms/AddProduct';

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
    post(route('products.store'));
  };

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Create Product" />

      <SidebarInset>
        {/* Header */}
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4 text-[hsl(var(--border))]" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <Link href="/dashboard" className="text-[hsl(var(--primary))] hover:text-[hsl(var(--primary-foreground))]">
                    Dashboard
                  </Link>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block text-[hsl(var(--muted-foreground))]" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-[hsl(var(--foreground))]">Create Product</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        {/* Main Content - Full Width Form */}
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0 bg-[hsl(var(--background))]">
          <div className="rounded-xl bg-[hsl(var(--muted))] p-6 shadow-md flex flex-col gap-4 w-full h-full">
            <h2 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4">Create New Product</h2>

            <AddProductForm/>
          </div>
        </div>
      </SidebarInset>
    </AuthenticatedLayout>
  );
}
