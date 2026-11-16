<?php

namespace App\Http\Controllers\Document;

use App\Http\Controllers\Controller;
use App\Http\Resources\Document\DocumentResource;
use App\Models\Document;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ViewDocumentController extends Controller
{
    public function index()
    {
        $documents = Document::orderBy("created_at", "desc")->paginate($request->per_page ?? 10)
            ->withQueryString();;

        $data = DocumentResource::collection($documents);

        return Inertia::render("document/page", compact("data"));
    }
}
