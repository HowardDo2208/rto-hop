<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class MaintScheme extends BaseModel
{
    use HasFactory;
    protected $table = 'MaintenanceScheme';
    protected $primaryKey = 'maintSchemeId';
    protected $guarded = ['maintSchemeId'];
    protected $fillable = [];
    protected $appends = array('id');

    public static $rules = array(
        'maintSchemeCode' => array('required'),
        'maintSchemeName' => array('required'),
        'costPerVisit' => array('required', 'numeric'),
        'intervalOfVisit' => array('required', 'numeric'),
    );

    public function getIdAttribute() {
        return $this->attributes['maintSchemeId'];
    }

    public function person_created() {
        return $this->belongsTo(User::class, 'personCreated', 'userId')
            ->select(['userId', 'userName', 'userFullName']);
    }
    public function person_updated() {
        return $this->belongsTo(User::class, 'personUpdated', 'userId')
            ->select(['userId', 'userName', 'userFullName']);
    }
}
