<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->longText('description')->nullable();
            $table->string('sku')->unique();
            $table->enum('type', ['simple', 'variable', 'variation']);
            $table->string('parent_sku')->nullable();
            $table->decimal('cost', 10, 2);
            $table->decimal('price', 10, 2)->default(0); // Valor por defecto de 0
            $table->boolean('stock_management')->default(false);
            $table->json('images')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
}
