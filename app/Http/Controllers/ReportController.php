<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ReportController extends Controller
{
    //
        public function index(Request $request): Response
    {
        $reports = DB::select('select * from reports ');
        return Inertia::render('Report/Home', [ 'reports' => $reports]);
    }
}
