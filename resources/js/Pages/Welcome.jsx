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
    <div className="min-h-screen flex items-center justify-center bg-[hsl(var(--secondary))] text-foreground">
      <Head title="Gestión para Woo" />

      <div className="w-full max-w-md p-8 rounded-lg bg-[hsl(var(--card))] text-[hsl(var(--card-foreground))] shadow-lg">
        <CardHeader className="text-center mb-4">
          <CardTitle className="text-3xl font-bold">¡Bienvenido de nuevo!</CardTitle>
          <p className="text-sm text-[hsl(var(--muted-foreground))]">
            Por favor, ingresa tus credenciales para acceder a tu cuenta
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Input
                type="email"
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
                className="w-full px-4 py-3 border border-[hsl(var(--border))] rounded-md bg-[hsl(var(--input))] text-[hsl(var(--foreground))] focus:ring focus:ring-[hsl(var(--ring))] focus:border-transparent transition duration-200 ease-in-out"
                placeholder="nombre@ejemplo.com"
                required
              />
              {errors.email && <p className="text-[hsl(var(--destructive))] text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <Input
                type="password"
                value={data.password}
                onChange={(e) => setData('password', e.target.value)}
                className="w-full px-4 py-3 border border-[hsl(var(--border))] rounded-md bg-[hsl(var(--input))] text-[hsl(var(--foreground))] focus:ring focus:ring-[hsl(var(--ring))] focus:border-transparent transition duration-200 ease-in-out"
                placeholder="Contraseña"
                required
              />
              {errors.password && <p className="text-[hsl(var(--destructive))] text-sm mt-1">{errors.password}</p>}
            </div>

            <Button
              type="submit"
              disabled={processing}
              className="w-full py-3 mt-4 text-lg font-semibold bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] rounded-md hover:bg-[hsl(var(--primary),0.9)] transition-colors duration-200"
            >
              {processing ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </Button>
          </form>
        </CardContent>
      </div>
    </div>
  );
}
