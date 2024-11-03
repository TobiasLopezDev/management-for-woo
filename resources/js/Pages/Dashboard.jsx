import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth }) {
  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Dashboard" />

      <div className="flex min-h-screen min-w-screen text-white">
        {/* Main Content */}
        <main className="flex-1 p-6">
          
          {/* Header */}
          <header className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-gray-400">Overview of your activity</p>
            </div>
            <div className="flex items-center space-x-4">
              <input
                type="text"
                placeholder="Search..."
                className="bg-gray-800 text-white p-2 rounded-lg placeholder-gray-400"
              />
            </div>
          </header>

          {/* Statistics Section */}
          <section className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gray-800 p-6 rounded-lg shadow-md text-center">
              <h2 className="text-xl font-semibold">Total Revenue</h2>
              <p className="text-3xl font-bold">$45,231.89</p>
              <p className="text-green-500">+20.1% from last month</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-md text-center">
              <h2 className="text-xl font-semibold">Subscriptions</h2>
              <p className="text-3xl font-bold">+2,350</p>
              <p className="text-green-500">+180.1% from last month</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-md text-center">
              <h2 className="text-xl font-semibold">Sales</h2>
              <p className="text-3xl font-bold">+12,234</p>
              <p className="text-green-500">+19% from last month</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-md text-center">
              <h2 className="text-xl font-semibold">Active Now</h2>
              <p className="text-3xl font-bold">+573</p>
              <p className="text-green-500">+201 since last hour</p>
            </div>
          </section>

          {/* Overview and Recent Sales */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Overview Graph */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-md lg:col-span-2">
              <h2 className="text-xl font-semibold mb-4">Overview</h2>
              <div className="h-48 bg-gray-700 rounded-lg flex items-center justify-center text-white">
                {/* Placeholder for Chart */}
                <p>Chart Placeholder</p>
              </div>
            </div>

            {/* Recent Sales */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Recent Sales</h2>
              <ul className="space-y-4">
                <li className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">Olivia Martin</p>
                    <p className="text-gray-400 text-sm">olivia.martin@email.com</p>
                  </div>
                  <p className="text-green-500">+$1,999.00</p>
                </li>
                <li className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">Jackson Lee</p>
                    <p className="text-gray-400 text-sm">jackson.lee@email.com</p>
                  </div>
                  <p className="text-green-500">+$39.00</p>
                </li>
                <li className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">Isabella Nguyen</p>
                    <p className="text-gray-400 text-sm">isabella.nguyen@email.com</p>
                  </div>
                  <p className="text-green-500">+$299.00</p>
                </li>
                <li className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">William Kim</p>
                    <p className="text-gray-400 text-sm">will@email.com</p>
                  </div>
                  <p className="text-green-500">+$99.00</p>
                </li>
                <li className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">Sofia Davis</p>
                    <p className="text-gray-400 text-sm">sofia.davis@email.com</p>
                  </div>
                  <p className="text-green-500">+$39.00</p>
                </li>
              </ul>
            </div>
          </section>

        </main>
      </div>
    </AuthenticatedLayout>
  );
}
