import React, { useState } from 'react';
import { useForm as useInertiaForm } from '@inertiajs/react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea'; // Assuming Shadcn provides a Textarea component
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Separator } from '@/components/ui/separator';
import { Package, Boxes } from 'lucide-react';
import ImageUpload from '../ImageUpload';

// Schema de validación
const formSchema = z.object({
    title: z.string().min(2, { message: "El título debe tener al menos 2 caracteres." }),
    sku: z.string().optional(),
    type: z.enum(['simple', 'variable']),
    cost: z.number().optional(),
    price: z.number().optional(),
    stock_management: z.boolean(),
    autoGenerateSku: z.boolean(),
    description: z.string().optional(),
    images: z.array(z.any()).optional(),
});

export function AddProductForm() {
    const { data, setData, post, errors: inertiaErrors } = useInertiaForm({
        title: '',
        sku: '',
        type: '',
        cost: '',
        price: '',
        stock_management: false,
        autoGenerateSku: true,
        description: '',
        images: [],
    });

    const [step, setStep] = useState(1);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: data,
    });

    const handleTypeSelection = (type) => {
        setData('type', type);
        form.setValue('type', type);
        setStep(2);
    };

    const handleTitleChange = (e) => {
        const title = e.target.value;
        setData('title', title);
        form.setValue('title', title);

        if (data.autoGenerateSku) {
            const generatedSku = title.toUpperCase().replace(/\s+/g, '-');
            setData('sku', generatedSku);
            form.setValue('sku', generatedSku);
        }
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        setData('images', [...data.images, ...files]);
        form.setValue('images', [...form.getValues('images'), ...files]);
    };

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const onSubmit = (formData) => {
        post(route('products.store'), { data: formData });
    };

    return (
        <div className="flex flex-col h-full">
            {/* Step 1: Select Product Type */}
            {step === 1 && (
                <div className="flex flex-col md:flex-row items-stretch justify-center space-y-4 md:space-y-0 md:space-x-8 w-full h-full">
                    <div
                        onClick={() => handleTypeSelection('simple')}
                        className="cursor-pointer flex flex-col items-center justify-center w-full md:w-1/2 p-8 bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] rounded-lg transition-all duration-200 hover:bg-[hsl(var(--primary))] hover:text-[hsl(var(--primary-foreground))]"
                    >
                        <Package className="h-16 w-16 mb-4" />
                        <h3 className="text-xl font-bold">Producto Simple</h3>
                        <p className="text-center text-sm mt-2">
                            Selecciona esta opción para productos sin variaciones, como tamaño o color. Ideal para productos únicos.
                        </p>
                    </div>
                    <div
                        onClick={() => handleTypeSelection('variable')}
                        className="cursor-pointer flex flex-col items-center justify-center w-full md:w-1/2 p-8 bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] rounded-lg transition-all duration-200 hover:bg-[hsl(var(--primary))] hover:text-[hsl(var(--primary-foreground))]"
                    >
                        <Boxes className="h-16 w-16 mb-4" />
                        <h3 className="text-xl font-bold">Producto Variable</h3>
                        <p className="text-center text-sm mt-2">
                            Elige esta opción para productos con diferentes variaciones, como color, tamaño o peso.
                        </p>
                    </div>
                </div>
            )}

            {/* Step 2: Product Details */}
            {step === 2 && (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col h-full">
                        <div className="space-y-4 flex-grow">
                            <h2 className="text-lg font-medium text-[hsl(var(--foreground))]">Detalles del Producto</h2>

                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[hsl(var(--foreground))]">¿Cuál es el título de tu producto?</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="Enter product title"
                                                {...field}
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    handleTitleChange(e);
                                                }}
                                                className="border-[hsl(var(--border))] focus:ring-[hsl(var(--primary))] focus:border-[hsl(var(--primary))]"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* SKU Section */}
                            <FormField
                                control={form.control}
                                name="sku"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[hsl(var(--foreground))]">SKU</FormLabel>
                                        <FormControl>
                                            <div className="flex items-center justify-between mt-1">
                                                <Input
                                                    type="text"
                                                    value={data.sku}
                                                    readOnly
                                                    className="text-[hsl(var(--muted-foreground))] px-3 py-2 rounded text-sm"
                                                />
                                                <Checkbox
                                                    checked={data.autoGenerateSku}
                                                    onCheckedChange={(checked) => {
                                                        setData('autoGenerateSku', checked);
                                                        form.setValue('autoGenerateSku', checked);
                                                        if (checked) {
                                                            const generatedSku = data.title.toUpperCase().replace(/\s+/g, '-');
                                                            setData('sku', generatedSku);
                                                            form.setValue('sku', generatedSku);
                                                        }
                                                    }}
                                                    id="autoGenerateSku"
                                                    className="ml-2"
                                                />
                                                <label htmlFor="autoGenerateSku" className="ml-2 text-sm font-medium text-[hsl(var(--foreground))]">
                                                    Crear SKU automático
                                                </label>
                                            </div>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            {/* Descripción */}
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[hsl(var(--foreground))]">Descripción</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Descripción del producto" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Imágenes */}
                            <FormField
                                control={form.control}
                                name="images"
                                render={() => (
                                    <FormItem>
                                        <FormLabel className="text-[hsl(var(--foreground))]">Imágenes</FormLabel>
                                        <FormControl>
                                            <input type="file" multiple onChange={handleImageUpload} accept="image/*" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Botones de Navegación */}
                        <div className="flex justify-between mt-6">
                            <Button onClick={prevStep} variant="secondary">
                                Volver
                            </Button>
                            <Button type="button" onClick={nextStep}>
                                Siguiente
                            </Button>
                        </div>
                    </form>
                </Form>
            )}
        </div>
    );
}

export default function AddProduct() {
    return (
        <div>
            <AddProductForm />
        </div>
    );
}
