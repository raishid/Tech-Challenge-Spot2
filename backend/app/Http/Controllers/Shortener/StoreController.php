<?php

namespace App\Http\Controllers\Shortener;

use App\Models\User;
use App\Models\Shortener;
use App\Services\Helpers;
use App\Http\Controllers\Controller;
use App\Http\Requests\Shortener\StoreRequest;

class StoreController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(StoreRequest $request)
    {
        $data = $request->validated();

        $code = Helpers::generateIdRandom();

        $user = Helpers::verifyUserOrCreate($data['user_id']);

        $shorten = Shortener::create([
            'url'   => $data['url'],
            'code'  => $code,
            'user_id'   => $user->id,
        ]);

        return response()->json([
            'url'   => $shorten->url,
            'code'  => $shorten->code,
        ]);
    }
}
