<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Image\Image;
use Illuminate\Support\Facades\Storage;

class ImageConvertController extends Controller
{
    public function index()
    {
        return Inertia::render('Client/ImageConverter', [
            'uploadedImages' => [],
            'convertedImages' => [],
        ]);
    }

    public function convert(Request $request)
    {
        $request->validate([
            'path' => 'required|string',
            'format' => 'required|in:jpg,png,webp,gif',
        ]);

        $originalFilename = $request->input('name') ?? 'image';
        $relativePath = str_replace('/storage/', '', $request->input('path'));
        $absolutePath = storage_path("app/public/{$relativePath}");

        if (!file_exists($absolutePath)) {
            return response()->json(['error' => 'File does not exist'], 404);
        }

        $format = $request->input('format') ?? 'jpg';
        $convertedImagePath = "converted/{$originalFilename}_lumipic_convert.{$format}";

        Image::load($absolutePath)
            ->format($format)
            ->save(storage_path("app/public/{$convertedImagePath}"));
        $convertedImage = [
            'name' => $originalFilename,
            'path' => Storage::url($convertedImagePath),
        ];
        return response()->json($convertedImage);
    }
}
