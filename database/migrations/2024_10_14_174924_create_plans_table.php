<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('plans', function (Blueprint $table) {
            $table->id();
            $table->enum('plan_type', ['week', 'month']);
            $table->integer('payments');
            $table->integer('bids');
            $table->integer('new_projects');
            $table->integer('new_accounts');
            $table->string('study');
            $table->date('period_from');
            $table->date('period_to');
            $table->integer('user_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('plans');
    }
};
