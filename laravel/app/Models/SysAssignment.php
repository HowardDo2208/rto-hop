<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SysAssignment extends BaseModel
{
    protected $table = 'SysAssignment';
    protected $primaryKey = 'assignmentId';
    protected $guarded = ['assignmentId'];
    protected $hidden = [];
}
