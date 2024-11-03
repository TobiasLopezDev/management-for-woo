import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Welcome({ toggleDarkMode }) {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
      <Head title="Management for Woo" />

      {/* Botón para alternar entre claro/oscuro */}
      <button
        onClick={toggleDarkMode}
        className="absolute top-4 right-4 p-2 bg-gray-300 rounded dark:bg-gray-700 dark:text-white"
      >
        Toggle Dark Mode
      </button>

      <div className="w-full max-w-md p-6 rounded-lg bg-[hsl(var(--card))] text-[hsl(var(--card-foreground))] shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold mb-2">Login</CardTitle>
          <p className="text-sm text-[hsl(var(--muted-foreground))]">
            Enter your credentials to access your account
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[hsl(var(--foreground))]">Email</label>
              <Input
                type="email"
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
                className="w-full px-4 py-2 border rounded-lg bg-[hsl(var(--input))] text-[hsl(var(--foreground))]"
                placeholder="name@example.com"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-[hsl(var(--foreground))]">Password</label>
              <Input
                type="password"
                value={data.password}
                onChange={(e) => setData('password', e.target.value)}
                className="w-full px-4 py-2 border rounded-lg bg-[hsl(var(--input))] text-[hsl(var(--foreground))]"
                placeholder="Password"
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            <Button
              type="submit"
              disabled={processing}
              className="w-full py-2 mt-4 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] rounded-lg hover:bg-[hsl(var(--primary),0.9)]"
            >
              {processing ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </CardContent>
      </div>
    </div>
  );
}
