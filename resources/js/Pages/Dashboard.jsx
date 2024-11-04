import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from "recharts";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";

// Datos ficticios para los gráficos
const salesData = [
  { month: "January", sales: 1200 },
  { month: "February", sales: 2100 },
  { month: "March", sales: 800 },
  { month: "April", sales: 1600 },
  { month: "May", sales: 900 },
  { month: "June", sales: 1700 },
];

const trafficData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const paymentData = [
  { method: "Credit Card", value: 45 },
  { method: "Paypal", value: 25 },
  { method: "Bank Transfer", value: 15 },
  { method: "Cash on Delivery", value: 15 },
];

const conversionData = [
  { week: "Week 1", conversionRate: 2.5 },
  { week: "Week 2", conversionRate: 3.0 },
  { week: "Week 3", conversionRate: 3.2 },
  { week: "Week 4", conversionRate: 2.8 },
];

const topProductsData = [
  { product: "Laptop", sales: 500 },
  { product: "Smartphone", sales: 700 },
  { product: "Headphones", sales: 300 },
  { product: "Keyboard", sales: 200 },
];

const avgOrderValueData = [
  { month: "January", avgOrderValue: 45 },
  { month: "February", avgOrderValue: 50 },
  { month: "March", avgOrderValue: 55 },
  { month: "April", avgOrderValue: 60 },
  { month: "May", avgOrderValue: 65 },
  { month: "June", avgOrderValue: 70 },
];

const colors = ["#2563eb", "#60a5fa", "#34d399", "#facc15"];

export default function Dashboard({ auth }) {
  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Dashboard" />

      <SidebarInset>
        <header className="flex h-16 items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <Link href="/dashboard" className="text-primary hover:text-primary-foreground">Dashboard</Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>eCommerce Overview</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <div className="p-4">
          <h1 className="text-2xl font-bold text-center mb-6">eCommerce Dashboard</h1>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
            {/* Gráfico de Ventas Mensuales */}
            <div className="aspect-video rounded-xl bg-muted/50 p-4">
              <h3 className="text-lg font-semibold text-center mb-2">Monthly Sales</h3>
              <LineChart data={salesData} width={400} height={250}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="sales" stroke="#2563eb" strokeWidth={2} />
              </LineChart>
            </div>

            {/* Tráfico por Dispositivo */}
            <div className="aspect-video rounded-xl bg-muted/50 p-4">
              <h3 className="text-lg font-semibold text-center mb-2">Traffic by Device</h3>
              <BarChart data={trafficData} width={400} height={250}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="desktop" fill="#2563eb" radius={4} />
                <Bar dataKey="mobile" fill="#60a5fa" radius={4} />
              </BarChart>
            </div>

            {/* Métodos de Pago */}
            <div className="aspect-video rounded-xl bg-muted/50 p-4">
              <h3 className="text-lg font-semibold text-center mb-2">Payment Methods</h3>
              <PieChart width={400} height={250}>
                <Tooltip />
                <Pie data={paymentData} dataKey="value" nameKey="method" cx="50%" cy="50%" outerRadius={80}>
                  {paymentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </div>

            {/* Tasa de Conversión */}
            <div className="aspect-video rounded-xl bg-muted/50 p-4">
              <h3 className="text-lg font-semibold text-center mb-2">Weekly Conversion Rate</h3>
              <LineChart data={conversionData} width={400} height={250}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="conversionRate" stroke="#facc15" strokeWidth={2} />
              </LineChart>
            </div>

            {/* Productos Más Vendidos */}
            <div className="aspect-video rounded-xl bg-muted/50 p-4">
              <h3 className="text-lg font-semibold text-center mb-2">Top Selling Products</h3>
              <BarChart data={topProductsData} width={400} height={250}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="product" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#34d399" radius={4} />
              </BarChart>
            </div>

            {/* Valor Promedio de Pedido */}
            <div className="aspect-video rounded-xl bg-muted/50 p-4">
              <h3 className="text-lg font-semibold text-center mb-2">Average Order Value</h3>
              <LineChart data={avgOrderValueData} width={400} height={250}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="avgOrderValue" stroke="#34d399" strokeWidth={2} />
              </LineChart>
            </div>
          </div>
        </div>
      </SidebarInset>
    </AuthenticatedLayout>
  );
}
