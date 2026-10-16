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

        // $role = Role::firstOrCreate(["name" => "admin", "description" => "Akses menyeluruh terhadap kofigurasi server dan sistem.", "is_system" => true]);


        $permissions = [
            [
                "name" => "role.manage",
                "description" => "Mengelola role dan hak akses pengguna",
            ],
            [
                "name" => "dashboard.view.personal",
                "description" => "Melihat dashboard yang menampilkan ringkasan tugas dan aktivitas pribadi",
            ],
            [
                "name" => "dashboard.view.project",
                "description" => "Melihat dashboard yang menampilkan ringkasan dan progres proyek",
            ],
            [
                "name" => "dashboard.view.sistem",
                "description" => "Melihat dashboard yang menampilkan ringkasan aktivitas dan statistik sistem",
            ],
            [
                "name" => "user.view",
                "description" => "Melihat daftar dan detail akun pengguna",
            ],
            [
                "name" => "user.create",
                "description" => "Membuat akun pengguna baru",
            ],
            [
                "name" => "user.edit",
                "description" => "Mengubah informasi dan data akun pengguna",
            ],
            [
                "name" => "user.delete",
                "description" => "Menghapus atau menonaktifkan akun pengguna",
            ],
            [
                "name" => "project.view.all",
                "description" => "Melihat seluruh proyek yang tersedia dalam sistem",
            ],
            [
                "name" => "project.view.own",
                "description" => "Melihat proyek yang dimiliki atau ditugaskan kepada pengguna",
            ],
            [
                "name" => "project.create",
                "description" => "Membuat dan menginisiasi proyek baru",
            ],
            [
                "name" => "project.edit",
                "description" => "Mengubah informasi, konfigurasi, dan data proyek",
            ],
            [
                "name" => "project.delete",
                "description" => "Menghapus proyek dari sistem",
            ],
            [
                "name" => "task.view.all",
                "description" => "Melihat seluruh tugas dari berbagai proyek yang tersedia",
            ],
            [
                "name" => "task.view.own",
                "description" => "Melihat tugas yang ditugaskan kepada pengguna",
            ],
            [
                "name" => "task.create",
                "description" => "Membuat tugas baru dalam suatu proyek",
            ],
            [
                "name" => "task.edit",
                "description" => "Mengubah informasi, status, dan penugasan tugas",
            ],
            [
                "name" => "task.delete",
                "description" => "Menghapus tugas dari suatu proyek",
            ],
        ];


        foreach ($permissions as $permission) {
            $parts = explode(".", $permission["name"]);

            Permission::updateOrCreate(
                ["name" => $permission["name"]],
                [
                    "description" => $permission["description"],
                    "resource" => $parts[0] ?? null,
                    "action" => $parts[1] ?? null,
                    "scope" => $parts[2] ?? null,
                ]
            );
        }

        // $role->givePermissionTo(Permission::all());

        // $admin = User::firstOrCreate([
        //     "name" => "SUPER ADMIN",
        //     "email" => "yahyaevan8@gmail.com",
        //     "password" => Hash::make("123123123"),
        //     "email_verified_at" => now(),
        //     "is_active" => true,
        // ]);

        // $admin = User::where("email", "yahyaevan8@gmail.com")->first();

        // $admin->assignRole("admin");
    }
}
