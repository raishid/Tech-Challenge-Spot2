<?php

namespace App\Http\Controllers\Shortener;

use App\Models\Shortener;
use App\Http\Controllers\Controller;
use App\Http\Requests\Shortener\RedirectRequest;

class RedirectShorten extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(RedirectRequest $request)
    {
        $data = $request->validated();

        $shorten = Shortener::where('code', $data['shorten'])->first();

        return response()->json([
            'url'   => $shorten->url,
        ]);
    }
}
