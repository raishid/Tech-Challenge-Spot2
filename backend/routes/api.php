<?php

use App\Http\Controllers\Shortener\StoreController as StoreShortener;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


//Shortener
Route::post('/shorten', StoreShortener::class)->name('shorten.store');


//Route::get('/{shortener}', )