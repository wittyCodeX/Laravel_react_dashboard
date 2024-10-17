<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Plan;

class PlanController extends Controller
{
    //
    public function index(Request $request): Response
    {
        $plans = DB::select('select * from plans ');
        return Inertia::render('Plan/Home', ['plans' => $plans]);
    }

    public function update(Request $request)
    {
        $plan = Plan::find($request->input("id"));
        $plan->payments = $request->input("payments");
        $plan->new_projects = $request->input("new_projects");
        $plan->bids = $request->input("bids");
        $plan->new_accounts = $request->input("new_accounts");
        $plan->study = $request->input("study");
        $plan->save();


        return back();
    }

    public function store(Request $request)
    {

        $old_plan = Plan::where([
            ['user_id', '=', $request->input("user_id")],
            ['period_from', '=', $request->input("period_from")],
            ['period_to', '=', $request->input("period_to")]
        ])->get();

        if (count($old_plan) > 0) {
            return back()->with('message', 'You Plan is already exist!');
        } else {
            $plan = new Plan;
            $plan->payments = $request->input("payments");
            $plan->new_projects = $request->input("new_projects");
            $plan->bids = $request->input("bids");
            $plan->new_accounts = $request->input("new_accounts");
            $plan->study = $request->input("study");
            $plan->period_from = $request->input("period_from");
            $plan->period_to = $request->input("period_to");
            $plan->user_id = $request->input("user_id");
            $plan->save();

            return back()->with('message', 'You Plan created successfully!');
        }
    }
}
