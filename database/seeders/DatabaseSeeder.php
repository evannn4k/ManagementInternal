<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $user = User::create([
            "name" => "SUPER ADMIN",
            "email" => "yahyaevan8@gmail.com",
            "password" => Hash::make("123123123"),
            "email_verified_at" => now(),
            "is_active" => true,
        ]);

        $role = Role::create(["name" => "admin", "description" => "Akses menyeluruh terhadap kofigurasi server dan sistem.", "is_system" => true]);
        
        $permissions = [
            [
                "name" => "role.manage",
                "description" => "Mengelola role dan perizinan",
            ],
            [
                "name" => "user.view",
                "description" => "melihat daftar akun pengguna",
            ],
            [
                "name" => "user.create",
                "description" => "Membuat akun pengguna baru",
            ],
            [
                "name" => "user.edit",
                "description" => "Mengedit akun yang sudah ada pengguna",
            ],
            [
                "name" => "user.delete",
                "description" => "Menghapus atau menonaktifkan akun pengguna",
            ],
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(
                ["name" => $permission["name"]],
                ["description" => $permission["description"]],
            );
        }

        $role->givePermissionTo(Permission::all());
        $user->assignRole("admin");
    }
}
