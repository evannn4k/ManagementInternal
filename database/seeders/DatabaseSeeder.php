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

        $role = Role::firstOrCreate(["name" => "admin", "description" => "Akses menyeluruh terhadap kofigurasi server dan sistem.", "is_system" => true]);

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
            [
                "name" => "project.view.all",
                "description" => "Melihat daftar proyek",
            ],
            [
                "name" => "project.view.team",
                "description" => "Melihat daftar proyek",
            ],
            [
                "name" => "project.view.own",
                "description" => "Melihat daftar proyek",
            ],
            [
                "name" => "project.create",
                "description" => "Membuat inisiasi proyek baru",
            ],
        ];

        foreach ($permissions as $permission) {
            $parts = explode(".", $permission["name"]);

            Permission::firstOrCreate(
                ["name" => $permission["name"]],
                [
                    "description" => $permission["description"],
                    "resource" => $parts[0] ?? null,
                    "action" => $parts[1] ?? null,
                    "scope" => $parts[2] ?? null,
                ]
            );
        }

        $role->givePermissionTo(Permission::all());

        // $admin = User::firstOrCreate([
        //     "name" => "SUPER ADMIN",
        //     "email" => "yahyaevan8@gmail.com",
        //     "password" => Hash::make("123123123"),
        //     "email_verified_at" => now(),
        //     "is_active" => true,
        // ]);
        
        // $admin->assignRole("admin");
    }
}
