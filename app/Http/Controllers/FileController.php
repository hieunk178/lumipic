<?php 

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FileController extends Controller
{
    public function upload(Request $request)
    {
        $request->validate([
            'image' => 'image|max:5120',
        ]);

        $image = $request->file('image');
        if (!$image) {
            return response()->json(['error' => 'No image uploaded'], 400);
        }
        $originalFilename = pathinfo($image->getClientOriginalName(), PATHINFO_FILENAME);
        $imagePath = $image->store('images', 'public');
        $uploadedImage = [
            'name' => $originalFilename,
            'path' => Storage::url($imagePath),
        ];
        return response()->json($uploadedImage);
    }

    public function download(Request $request)
    {
        $request->validate([
            'images' => 'required|array',
            'images.*.path' => 'required|string',
        ]);

        $zip = new \ZipArchive();
        $zipName = 'converted_images.zip';
        $zipPath = storage_path("app/public/{$zipName}");
        if (file_exists($zipPath)) {
            unlink($zipPath);
        }
        if ($zip->open($zipPath, \ZipArchive::CREATE | \ZipArchive::OVERWRITE) !== true) {
            return response()->json(['error' => 'Cannot create zip file'], 500);
        }

        foreach ($request->input('images') as $image) {
            $relativePath = str_replace('/storage/', '', parse_url($image['path'], PHP_URL_PATH));
            $absolutePath = storage_path("app/public/{$relativePath}");

            if (!file_exists($absolutePath)) {
                continue;
            }

            $zip->addFile($absolutePath, basename($absolutePath));
        }

        $zip->close();

        return response()->download($zipPath, $zipName)->deleteFileAfterSend(true);
    }
}