<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class ShortenerCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'data' => ShortenerResource::collection($this->collection),
            'links' => [
                'next' => $this->nextPageUrl(),
                'prev' => $this->previousPageUrl(),
                'page' => $this->currentPage(),
                'total' => $this->lastPage(),
                'per_page' => $this->perPage(),
            ],
        ];
    }
}
