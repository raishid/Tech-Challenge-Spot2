<?php

namespace App\Http\Controllers\Shortener;

use App\Models\Shortener;
use App\Http\Controllers\Controller;

class RedirectShorten extends Controller
{
    /**
     * Obtener la url original de un shortener
     * @OA\Get (
     *     path="/api/shorten/{code}",
     *     tags={"Shortener"},
     *     @OA\Parameter(
     *       name="code",
     *       in="path",
     *       required=true,
     *       description="codigo del shortener",
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Obtener la url original de un shortener",
     *         @OA\JsonContent(
     *
     *             @OA\Property(
     *                 type="string",
     *                 property="url",
     *                 example="https://imgur.com/gallery/uh-i-don-t-remember-saving-this-dSepCYe"
     *             ),
     *        
     *         )
     *     )
     * )
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
