<?php

namespace App\Http\Controllers\Shortener;

use App\Models\Shortener;
use App\Services\Helpers;
use App\Http\Controllers\Controller;
use App\Http\Requests\Shortener\StoreRequest;

class StoreController extends Controller
{
    /**
     * Crear un shortener
     * @OA\Post (
     *     path="/api/shorten",
     *     tags={"Shortener"},
     * @OA\RequestBody(
     *    @OA\MediaType(
     *        mediaType="application/x-www-form-urlencoded",
     *        @OA\Schema(
     *            @OA\Property(
     *                property="url",
     *                type="string",
     *                example="https://imgur.com/gallery/uh-i-don-t-remember-saving-this-dSepCYe"
     *            ),
     *            @OA\Property(
     *                property="user_id",
     *                type="string",
     *                example="25680da0-036b-4e9e-bc33-8f74495c853b" 
     *            ),
     *        )
     *    )
     *  ),
     *     @OA\Response(
     *         response=200,
     *         description="Crear un shortener",
     *         @OA\JsonContent(
     *
     *             @OA\Property(
     *                 type="array",
     *                 property="data",
     *                 @OA\Items(
     *                     type="object",
     *                     @OA\Property(
     *                         property="url",
     *                         type="string",
     *                         example="https://imgur.com/gallery/uh-i-don-t-remember-saving-this-dSepCYe"
     *                     ),
     *                     @OA\Property(
     *                         property="code",
     *                         type="string",
     *                         example="dSepCYeH"
     *                     ),
     *                 )
     *             ),
     *        
     *         )
     *     )
     * )
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
