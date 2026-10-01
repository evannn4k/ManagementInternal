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
        Schema::create('tasks', function (Blueprint $table) {
            // $table->id();
            $table->uuid('id')->primary();
            $table->foreignUuid("status_id")->constrained("statuses")->cascadeOnDelete();
            $table->string("title");
            $table->text("description");
            $table->enum('priority', ["urgent", "high", "medium", "low"])->default("medium");
            $table->date("due_date")->nullable();
            $table->json("label")->nullable();
            $table->string("file")->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
