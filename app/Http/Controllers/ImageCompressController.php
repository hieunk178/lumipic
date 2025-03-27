<?php 

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Spatie\Image\Image;

class ImageCompressController
{
    public function index()
    {
        return Inertia::render('Client/ImageCompress', [
            'uploadedImages' => [],
            'convertedImages' => [],
        ]);
    }
    public function compress(Request $request)
    {
        $request->validate([
            'path' => 'required|string',
            'quality' => 'required|integer|between:1,100',
        ]);

        $originalFilename = $request->input('name') ?? 'image';
        $relativePath = str_replace('/storage/', '', $request->input('path'));
        $absolutePath = storage_path("app/public/{$relativePath}");

        if (!file_exists($absolutePath)) {
            return response()->json(['error' => 'File does not exist'], 404);
        }

        $quality = $request->input('quality') ?? 80;
        $compressedImagePath = "compressed/{$originalFilename}_lumipic_compress.jpg";

        Image::load($absolutePath)
            ->quality($quality)
            ->save(storage_path("app/public/{$compressedImagePath}"));
        $compressedImage = [
            'name' => $originalFilename,
            'path' => Storage::url($compressedImagePath),
        ];
        return response()->json($compressedImage);
    }
}