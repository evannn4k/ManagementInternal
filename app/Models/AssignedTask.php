<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Guarded;
use Illuminate\Database\Eloquent\Relations\Pivot;


#[Guarded([])]
class AssignedTask extends Pivot
{
    protected $table = "assigned_task";
    public $timestamps = false;
}
