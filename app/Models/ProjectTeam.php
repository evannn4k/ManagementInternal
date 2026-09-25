<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Guarded;
use Illuminate\Database\Eloquent\Relations\Pivot;

#[Guarded([''])]
class ProjectTeam extends Pivot
{
    protected $table = "project_team";
    public $timestamps = false;
}
