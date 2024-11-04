import React, { useState } from 'react';
import { useForm as useInertiaForm, usePage } from '@inertiajs/react';

import { Button } from '@/Components/ui/button';
import { Checkbox } from '@/Components/ui/checkbox';
import { Input } from '@/Components/ui/input';
import { Textarea } from '@/Components/ui/textarea';
import { Package, Boxes } from 'lucide-react';

export function AddProductForm() {
    const { errors } = usePage().props; 
    const { data, setData, post } = useInertiaForm({
        title: '',
        sku: '',
        type: '',
        parent_sku: '',
        cost: '',
        price: '',
        stock_management: false,
        description: '',
        images: [],
    });

    const [step, setStep] = useState(1);

    const handleTypeSelection = (type) => {
        setData('type', type);
        setStep(2);
    };

    const handleImageChange = (index, value) => {
        const updatedImages = [...data.images];
        updatedImages[index] = value;
        setData('images', updatedImages);
    };

    const handleImageRemove = (index) => {
        const updatedImages = data.images.filter((_, i) => i !== index);
        setData('images', updatedImages);
    };

    const addImageField = () => {
        setData('images', [...data.images, '']);
    };

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const onSubmit = (e) => {
        e.preventDefault();
        post(route('products.store'));
    };

    return (
        <div className="flex flex-col h-full">
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

            {step === 2 && (
                <form onSubmit={onSubmit} className="space-y-4">
                    <h2 className="text-lg font-medium">Detalles del Producto</h2>

                    {/* Título */}
                    <div>
                        <label className="block text-sm font-medium">Título del Producto</label>
                        <Input
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            placeholder="Ingrese el título del producto"
                        />
                        {errors.title && <div className="text-red-500 text-sm">{errors.title}</div>}
                    </div>

                    {/* Descripcion */}
                    <div>
                        <label className="block text-sm font-medium">Descripcion del Producto</label>
                        <Textarea
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            placeholder="Ingrese la descripcion del producto"
                        />
                        {errors.description && <div className="text-red-500 text-sm">{errors.description}</div>}
                    </div>

                    {/* SKU */}
                    <div>
                        <label className="block text-sm font-medium">SKU</label>
                        <Input
                            value={data.sku}
                            onChange={(e) => setData('sku', e.target.value)}
                            placeholder="SKU"
                        />
                        {errors.sku && <div className="text-red-500 text-sm">{errors.sku}</div>}
                    </div>

                    {/* Costo */}
                    <div>
                        <label className="block text-sm font-medium">Costo</label>
                        <Input
                            type="number"
                            value={data.cost}
                            onChange={(e) => setData('cost', e.target.value)}
                            placeholder="Costo"
                        />
                        {errors.cost && <div className="text-red-500 text-sm">{errors.cost}</div>}
                    </div>

                    {/* Precio */}
                    <div>
                        <label className="block text-sm font-medium">Precio</label>
                        <Input
                            type="number"
                            value={data.price}
                            onChange={(e) => setData('price', e.target.value)}
                            placeholder="Precio"
                        />
                        {errors.price && <div className="text-red-500 text-sm">{errors.price}</div>}
                    </div>

                    {/* Gestión de Inventario */}
                    <div>
                        <label className="block text-sm font-medium">Gestión de Inventario</label>
                        <Checkbox
                            checked={data.stock_management}
                            onCheckedChange={(checked) => setData('stock_management', checked)}
                        />
                        {errors.stock_management && <div className="text-red-500 text-sm">{errors.stock_management}</div>}
                    </div>

                    {/* Imágenes */}
                    <div>
                        <label className="block text-sm font-medium">Imágenes</label>
                        {data.images.map((image, index) => (
                            <div key={index} className="flex items-center gap-2 mb-2">
                                <Input
                                    type="url"
                                    placeholder="URL de imagen"
                                    value={image}
                                    onChange={(e) => handleImageChange(index, e.target.value)}
                                />
                                <Button type="button" onClick={() => handleImageRemove(index)} variant="destructive">
                                    Eliminar
                                </Button>
                            </div>
                        ))}
                        <Button type="button" onClick={addImageField} variant="outline">
                            Añadir imagen
                        </Button>
                        {errors.images && <div className="text-red-500 text-sm">{errors.images}</div>}
                    </div>

                    <div className="flex justify-between mt-4">
                        <Button onClick={prevStep} variant="secondary">Volver</Button>
                        <Button type="submit">Guardar Producto</Button>
                    </div>
                </form>
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
