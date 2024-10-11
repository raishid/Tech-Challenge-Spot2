<?php

use App\Http\Controllers\Shortener\GetShorteners;
use App\Http\Controllers\Shortener\RedirectShorten;
use App\Http\Controllers\Shortener\StoreController as StoreShortener;
use Illuminate\Support\Facades\Route;


//Shortener
Route::post('/shorten', StoreShortener::class)->name('shorten.store');
Route::get('/shorten/{code}', RedirectShorten::class)->name('shorten.redirect');
Route::get('/{user}', GetShorteners::class)->name('shorten.get');
