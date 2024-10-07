<?php

namespace App\Services;

use App\Models\Shortener;
use App\Models\User;
use Illuminate\Support\Str;

class Helpers
{
  public static function generateIdRandom()
  {
    do {
      $code = Str::random(8);
      $shortener = Shortener::where('code', $code)->first();
    } while ($shortener != null);

    return $code;
  }

  public static function verifyUserOrCreate(string $uuid)
  {
    $user = User::where('uuid', $uuid)->first();

    if ($user == null) {
      $user = User::create([
        'uuid' => $uuid,
      ]);
    }

    return $user;
  }
}
