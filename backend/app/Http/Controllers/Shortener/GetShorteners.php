<?php

namespace App\Http\Controllers\Shortener;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\ShortenerCollection;

/**
 * @OA\Info(
 *             title="Api Shortener", 
 *             version="1.0",
 *             description="Listar los shorteners de un usuario",
 * )
 * 
 */

class GetShorteners extends Controller
{
    /**
     * Listar los shorteners de un usuario
     * @OA\Get (
     *     path="/api/{user}",
     *     tags={"Shortener"},
     *     @OA\Parameter(
     *       name="user",
     *       in="path",
     *       required=true,
     *       description="Id del usuario",
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Listar los shorteners de un usuario",
     *         @OA\JsonContent(
     *
     *             @OA\Property(
     *                 type="array",
     *                 property="data",
     *                 @OA\Items(
     *                     type="object",
     *                     @OA\Property(
     *                         property="id",
     *                         type="string",
     *                         example="25680da0-036b-4e9e-bc33-8f74495c853b"
     *                     ),
     *                     @OA\Property(
     *                         property="url",
     *                         type="string",
     *                         example="https://imgur.com/gallery/uh-i-don-t-remember-saving-this-dSepCYe"
     *                     ),
     *                     @OA\Property(
     *                         property="code",
     *                         type="string",
     *                         example="wrtvZhHs"
     *                     ),
     *                     @OA\Property(
     *                         property="vists",
     *                         type="number",
     *                         example="15"
     *                     ),
     *                     @OA\Property(
     *                         property="created_at",
     *                         type="string",
     *                         example="2024-02-23T00:09:16.000000Z"
     *                     ),
     *                 )
     *             ),
     *             @OA\Property(
     *              type="array",
     *              property="links",
     *              @OA\Items(
     *                  type="object",
     *                  @OA\Property(
     *                      property="next",
     *                      type="string|NULL",
     *                      example="http://localhost:8000/api/shorten/wrtvZhHs?page=2"
     *                   ),
     *                   @OA\Property(
     *                      property="prev",
     *                      type="string|NULL",
     *                      example="http://localhost:8000/api/shorten/wrtvZhHs?page=1"
     *                   ),
     *                   @OA\Property(
     *                      property="total",
     *                      type="number",
     *                      example="30"
     *                   ),
     *                   @OA\Property(
     *                      property="per_page",
     *                      type="number",
     *                      example="10"
     *                   ),
     *               ),
     *             ),
     *         )
     *     )
     * )
     */
    public function __invoke(User $user, Request $request)
    {

        $page = $request->query('page', 1);

        $shorteners = $user->shorteners()->orderBy('created_at', 'desc')->paginate(10, ['*'], 'page', $page);

        return response()->json(ShortenerCollection::make($shorteners));
    }
}
