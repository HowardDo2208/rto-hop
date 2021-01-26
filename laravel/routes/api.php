<?php

use App\Models\SysAssignment;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/users', function (Request $request) {
    $dataUser = User::select(['userId', 'userName', 'userFullName', 'posId', 'checkDeviceImei', 'userType', 'userRemark', 'noticeEmail', 'noticeMobile', 'userImagePath'])
//                ->with('assignments')
        ->where('userName', $request->user()->userName)->first()->toArray();
//            return response()->json(array_merge($tokenContent, $dataUser), 200);
    //////////////////
    $dataAssignments = SysAssignment::leftJoin('SysSubmodule', 'SysSubmodule.submoduleId', '=', 'SysAssignment.submoduleId')
        ->leftJoin('SysModule', 'SysModule.moduleId', '=', 'SysSubmodule.moduleId')
        ->where('SysAssignment.userId', $dataUser['userId'])
        ->whereNotNull('SysSubmodule.webAuth')
        ->where('SysSubmodule.submoduleActive', 1)
        ->where('SysAssignment.assignmentActive', 1)
        ->where('SysModule.moduleActive', 1)
        ->pluck('webAuth');
    $dataUser['assignments'] = $dataAssignments;
    return response()->json($dataUser);
});

Route::post('users', 'UserController@login');
Route::post('users/forgot-password', function (Request $request) {
    $request->validate(['email' => 'required | email']);

    $status = Password::sendResetLink(
        $request->only('email')
    );

    return $status === Password::RESET_LINK_SENT
                ? back()->with(['status' => __($status)])
                : back()->withErrors(['email' => __($status)]);
})->middleware('guest')->name('password.email');

Route::post('reference/maintscheme/find', 'MaintSchemeController@find');
Route::put('reference/maintscheme/deleteItems','MaintSchemeController@deleteItems');
Route::put('reference/maintscheme/updateStatus','MaintSchemeController@updateStatus');
Route::apiResource('reference/maintscheme', 'MaintSchemeController');

