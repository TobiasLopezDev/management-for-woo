import * as React from "react";
import {
  Box,
  Package,
  ShoppingBag,
  BarChart2,
  LayoutDashboard
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

export function AppSidebar({ user, ...props }) {
  const data = {
    navMain: [
      {
        title: "Escritorio",
        url: "/dashboard", // Actualiza la URL a la ruta de tu dashboard
        icon: LayoutDashboard,
      },
      {
        title: "Productos",
        url: "/products",
        icon: Box,
        items: [
          { title: "Añadir Producto", url: "/products/create" },
          { title: "Ver Todos los Productos", url: "/products" },
          { title: "Atributos", url: "#" },
        ],
      },
      {
        title: "Stock",
        url: "#",
        icon: Package,
        items: [
          { title: "Buscar Stock", url: "#" },
          { title: "Añadir Stock", url: "#" },
          { title: "Configuración", url: "#" },
        ],
      },
      {
        title: "Tienda",
        url: "#",
        icon: ShoppingBag,
        items: [
          { title: "Configuración", url: "#" },
          { title: "Herramientas", url: "#" },
        ],
      },
      {
        title: "Informes",
        url: "#",
        icon: BarChart2,
        items: [
          { title: "Informe de Ventas", url: "#" },
          { title: "Informe de Órdenes", url: "#" },
          { title: "Informe de Envíos", url: "#" },
        ],
      },
    ],
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>{/* Aquí puede ir un logo o texto */}</SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
