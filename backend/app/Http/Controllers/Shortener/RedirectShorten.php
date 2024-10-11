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
    public function __invoke($shorten)
    {
        $shorten = Shortener::where('code', $shorten)->firstOrFail();

        $shorten->increment('visits');
        $shorten->save();

        return response()->json([
            'url'   => $shorten->url,
        ]);
    }
}
