<?php

use Illuminate\Database\Seeder;
use App\User;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
        	'name'		=>	'Panos',
        	'email'		=>	'hello@pagapiou.com',
        	'password'	=>	bcrypt('hello123'),
        	'role'		=>	'administrator'
        ]);
    }
}
