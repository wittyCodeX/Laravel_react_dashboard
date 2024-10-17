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
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->enum('type', ['project', 'full-time', 'task', 'contract', 'internship']);;
            $table->string('project_name');
            $table->string('your_role');
            $table->string('your_name');
            $table->string('your_country');
            $table->string('client_name');
            $table->string('client_country');
            $table->float('budget');
            $table->integer('period');
            $table->enum('period_unit', ['min', 'hour', 'day', 'month', 'year']);
            $table->date('start_date');
            $table->string('got_from');
            $table->enum('status', ['open', 'finished', 'closed']);
            $table->integer('user_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
