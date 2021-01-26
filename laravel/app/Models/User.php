<?php

namespace App\Models;

use Illuminate\Contracts\Auth\CanResetPassword;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable implements CanResetPassword
{
    use HasFactory, Notifiable, HasApiTokens;

    protected $table = 'User';
    protected $primaryKey = 'userId';
    protected $guarded = ['userId'];
    protected $fillable = [];
    protected $hidden = ['password', 'loginPassword', 'remember_token'];

    public function assignments() {
        return $this->hasMany('App\SysAssignment', 'userId', 'userId')
            ->leftJoin('SysSubmodule', 'SysSubmodule.submoduleId', '=', 'SysAssignment.submoduleId')
            ->leftJoin('SysModule', 'SysModule.moduleId', '=', 'SysSubmodule.moduleId')
            ->where('SysSubmodule.submoduleActive', 1)
            ->where('SysAssignment.assignmentActive', 1)
            ->where('SysModule.moduleActive', 1);
    }

    public function findForPassport($username) {
        return $this->where('userName', $username)->first();
    }

}
