<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    // Método para mostrar el formulario de creación de un producto
    public function create()
    {
        return Inertia::render('Product/Create');
    }

    // Método para almacenar un nuevo producto
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'sku' => 'required|string|unique:products,sku',
            'type' => 'required|in:simple,variable,variation',
            'parent_sku' => 'nullable|string',
            'cost' => 'required|numeric|between:0,999999.99',
            'price' => 'nullable|numeric|between:0,999999.99',
            'stock_management' => 'required|boolean',
            'images' => 'nullable|array',
            'images.*' => 'url',
        ]);

        Product::create($validated);

        return redirect()->route('products.index')->with('success', 'Product created successfully');
    }

    // Método para listar los productos
    public function index()
    {
        $products = Product::all();
        return Inertia::render('Product/Index', [
            'products' => $products,
        ]);
    }
}
