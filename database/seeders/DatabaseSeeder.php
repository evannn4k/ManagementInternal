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
            'name' => 'SUPER ADMIN',
            'email' => 'yahyaevan8@gmail.com',
            'password' => Hash::make("123123123"),
            'email_verified_at' => now(),
            'is_active' => true,
        ]);

        $role = Role::create(['name' => 'admin']);
        $permission = Permission::create(['name' => 'role.manage']);

        $role->givePermissionTo($permission);
        $user->assignRole('admin');
    }
}
