<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function login(Request $request)
    {
        $request->request->add([
            "grant_type" => $request->get('grant_type') ?: 'password',
            "scope" => '*',
        ]);
        $tokenRequest = $request->create('/oauth/token', 'POST', $request->all());
        $response = \Route::dispatch($tokenRequest);
        $tokenContent = json_decode($response->getContent());
        $tokenStatusCode = $response->getStatusCode(); // 401 unauthorized, 200 ok
        if ($tokenStatusCode !== 200) {
            return $response;
        } else {
            if (!$request->get('username')) {
                return response()->json(
                    [
                        'errors' => [
                            'status' => 401,
                            'message' => 'Unauthenticated. Missing parameter username.',
                        ]
                    ],
                    401);
            } else {
                return response()->json(
                    $tokenContent, 200);
            }
        }
    }
}
