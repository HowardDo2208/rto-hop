<?php


namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Http;

class TestController extends Controller
{
   public function authToken() {
       $response = Http::asForm()->post('http://localhost:8000/oauth/token', [
           'grant_type' => 'password',
           'client_id' => '11',
           'client_secret' => 't45RwiYup1ujrhfhyxbCUbxLESxz1413FEcTfTOC',
           'username' => 'testaccount',
           'password' => 'welcome',
           'scope' => '',
       ]);

       dd($response->json());
   }
}
