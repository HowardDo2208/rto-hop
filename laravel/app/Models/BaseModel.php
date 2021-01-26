<?php

namespace App\Models;

use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;

class BaseModel extends Model {

    use SoftDeletes;

    const CREATED_AT = 'dtCreated';
    const UPDATED_AT = 'dtUpdated';
    const DELETED_AT = 'dtDeleted';

    protected $softDelete = true;

    public static function boot()
    {
        parent::boot();

        static::creating(function($model)
        {
            $user = \Auth::user();
            if($user) {
                $model->personCreated = $user->userId;
                $model->personUpdated = $user->userId;
            }
        });

        static::updating(function($model)
        {
            $user = \Auth::user();
            if($user) {
                $model->personUpdated = $user->userId;
            }
        });

        static::deleting(function($model)
        {
            $user = \Auth::user();
            if($user) {
                $model->personDeleted = $user->userId;
                $model->save();
            }
        });
    }
}
