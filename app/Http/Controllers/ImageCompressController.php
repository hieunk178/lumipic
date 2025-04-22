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
        $absolutePath = public_path($request->input('path'));

        if (!file_exists($absolutePath)) {
            return response()->json(['error' => 'File does not exist'], 404);
        }

        $quality = $request->input('quality') ?? 80;
        $compressedDir = public_path('/uploads/compressed');
        if (!is_dir($compressedDir)) {
            mkdir($compressedDir, 0755, true);
        }
        $compressedImagePath = "/uploads/compressed/{$originalFilename}_lumipic_compress.jpg";

        Image::load($absolutePath)
            ->quality($quality)
            ->save(public_path($compressedImagePath));
        $compressedImage = [
            'name' => $originalFilename,
            'path' => $compressedImagePath,
        ];
        return response()->json($compressedImage);
    }
}