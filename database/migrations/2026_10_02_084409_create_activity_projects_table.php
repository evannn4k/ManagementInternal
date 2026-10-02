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
        Schema::create('activity_projects', function (Blueprint $table) {
            // $table->id();
            $table->uuid()->primary();
            $table->foreignUuid("project_id")->constrained("projects")->cascadeOnDelete();
            $table->foreignId("user_id")->constrained("users")->cascadeOnDelete();
            $table->string("action")->nullable();
            $table->string("subject")->nullable();
            $table->string("subject_id")->nullable();
            $table->string("description")->nullable();
            $table->string("ip_address")->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('activity_projects');
    }
};
