<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
  //
  public function index(Request $request): Response
  {

    $query = Project::query();

    // Order by created date and paginate
    $projects = $query->orderBy('updated_at', 'desc')->paginate();

    // Count project statuses
    $allProjects = Project::all();
    $openedProjects = $allProjects->where('status', 'open')->count();
    $closedProjects = $allProjects->where('status', 'closed')->count();
    $finishedProjects = $allProjects->where('status', 'finished')->count();

    // Render the Inertia view with the fetched projects and counts
    return Inertia::render('Project/Home', [
      'projects' => $projects,
      'openCount' => $openedProjects,
      'closeCount' => $closedProjects,
      'finishCount' => $finishedProjects,
    ]);
  }
  public function store(Request $request)
  {
    $project = new Project();
    $project->type = $request->data['type'];
    $project->project_name = $request->data['project_name'];
    $project->your_role = $request->data['your_role'];
    $project->your_name = $request->data['your_name'];
    $project->your_country = $request->data['your_country'];
    $project->client_name = $request->data['client_name'];
    $project->client_country = $request->data['client_country'];
    $project->budget = $request->data['budget'];
    $project->period = $request->data['period'];
    $project->period_unit = $request->data['period_unit'];
    $project->start_date = $request->data['start_date'];
    $project->got_from = $request->data['got_from'];
    $project->status = $request->data['project_status'];
    $project->user_id = $request->user_id;

    $project->save();

    return back();
  }
  public function updata(Request $request)
  {
    $data = $request->data;

    //dd($request->data);
    $project = Project::find($request->id);
    $project->type = $data['type'];
    $project->project_name = $data['project_name'];
    $project->your_name = $data['your_name'];
    $project->client_name = $data['client_name'];
    $project->client_country = $data['client_country'];
    $project->budget = $data['budget'];
    $project->period = $data['period'];
    $project->start_date = $data['start_date'];
    $project->status = $data['project_status'];
    $project->save();

    //return "12312938471928379";
  }
  public function delete(Request $request)
  {
    $id = $request->id;
    Project::where('id', $id)->delete();
  }
}
