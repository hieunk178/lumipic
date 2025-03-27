<?php

use App\Http\Controllers\FileController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\HtmlToImageController;
use App\Http\Controllers\ImageCompressController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ImageConvertController;
use App\Http\Controllers\ImageResizeController;

Route::get('/', HomeController::class)->name('home');

Route::get('/converter', [ImageConvertController::class, 'index'])->name('converter.index');
Route::post('/convert-image', [ImageConvertController::class, 'convert'])->name('convert.process');

Route::get('/compress', [ImageCompressController::class, 'index'])->name('compress.index');
Route::post('/compress-image', [ImageCompressController::class, 'compress'])->name('compress.process');

Route::get('/resize', [ImageResizeController::class, 'index'])->name('resize.index');

Route::get('/html-to-image', [HtmlToImageController::class, 'htmlToImage'])->name('html-to-image');


Route::post('/upload', [FileController::class, 'upload'])->name('file.upload');
Route::post('/download', [FileController::class, 'download'])->name('file.download');
