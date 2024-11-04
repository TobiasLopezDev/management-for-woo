<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display the form to create a new product.
     *
     * @return \Inertia\Response
     */
    public function create()
    {
        return Inertia::render('Product/Create');
    }

    /**
     * Store a newly created product in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'description' => 'nullable|string',
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

    /**
     * Display a listing of the products.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        $products = Product::all();
        return Inertia::render('Product/Index', [
            'products' => $products,
        ]);
    }

    /**
     * Show the form for editing the specified product.
     *
     * @param  int  $id
     * @return \Inertia\Response
     */
    public function edit($id)
    {
        $product = Product::findOrFail($id);
        return Inertia::render('Product/Edit', [
            'product' => $product,
        ]);
    }

    /**
     * Update the specified product in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'sku' => 'required|string|unique:products,sku,' . $id,
            'type' => 'required|in:simple,variable,variation',
            'parent_sku' => 'nullable|string',
            'cost' => 'required|numeric|between:0,999999.99',
            'price' => 'nullable|numeric|between:0,999999.99',
            'stock_management' => 'required|boolean',
            'images' => 'nullable|array',
            'images.*' => 'url',
        ]);

        $product = Product::findOrFail($id);
        $product->update($validated);

        return redirect()->route('products.index')->with('success', 'Product updated successfully');
    }

    /**
     * Display the specified product.
     *
     * @param  \App\Models\Product  $product
     * @return \Inertia\Response
     */
    public function view(Product $product)
    {
        return Inertia::render('Product/View', [
            'product' => $product,
        ]);
    }

    /**
     * Show the confirmation page to delete the specified product.
     *
     * @param  \App\Models\Product  $product
     * @return \Inertia\Response
     */
    public function delete(Product $product)
    {
        return Inertia::render('Product/Delete', [
            'product' => $product,
        ]);
    }

    /**
     * Remove the specified product from storage.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Product $product)
    {
        $product->delete();

        return redirect()->route('products.index')->with('success', 'Product deleted successfully');
    }
}
