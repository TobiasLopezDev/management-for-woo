import * as React from "react";
import {
  Box,
  Package,
  ShoppingBag,
  BarChart2,
} from "lucide-react"; // Ajusta los iconos según sea necesario

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
        title: "Productos",
        url: "#",
        icon: Box,
        items: [
          { title: "Añadir Producto", url: "#" },
          { title: "Ver Todos los Productos", url: "#" },
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
