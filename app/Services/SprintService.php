<?php

namespace App\Services;

use App\Models\Sprint;
use Carbon\Carbon;
use Illuminate\Validation\ValidationException;

class SprintService
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    public function validate(
        string $projectId,
        string|Carbon $startDate,
        string|Carbon $endDate,
        string|int|null $ignoreId = null,
    ) {
        $start = Carbon::parse($startDate)->toDateString();
        $end = Carbon::parse($endDate)->toDateString();
        
        return Sprint::where("project_id", $projectId)
            ->when($ignoreId, function ($query) use ($ignoreId) {
                $query->where("id", "!=", $ignoreId);
            })
            ->where("start_date", "<=", $end)
            ->where("end_date", ">=", $start)
            ->exists();
    }
}
