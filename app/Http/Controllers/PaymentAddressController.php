<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class PaymentAddressController extends Controller
{
    //
        public function index(Request $request): Response
    {
        $paymentAddress = DB::select('select * from payments_addresses ');
        $paymentTypes = DB::select('select * from payment_types ');
        return Inertia::render('PaymentAddress/Home', ['paymentAddress' => $paymentAddress, 'paymentTypes' => $paymentTypes]);
    }
}
