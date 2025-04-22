<?php 

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

use function Termwind\parse;

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
        $compressedDir = public_path('/uploads/images');
        if (!is_dir($compressedDir)) {
            mkdir($compressedDir, 0755, true);
        }
        $originalFilename = pathinfo($image->getClientOriginalName(), PATHINFO_FILENAME);
        $imagePath = $image->store('images', 'local');
        $url = Storage::url($imagePath);
        $uploadedImage = [
            'name' => $originalFilename,
            'path' => parse_url($url, PHP_URL_PATH),
            'url' => $url,
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
        $zipPath = public_path("/uploads/zip/{$zipName}");
        if (file_exists($zipPath)) {
            unlink($zipPath);
        }
        if ($zip->open($zipPath, \ZipArchive::CREATE | \ZipArchive::OVERWRITE) !== true) {
            return response()->json(['error' => 'Cannot create zip file'], 500);
        }

        foreach ($request->input('images') as $image) {
            $absolutePath = public_path($image['path']);

            if (!file_exists($absolutePath)) {
                continue;
            }

            $zip->addFile($absolutePath, basename($absolutePath));
        }

        $zip->close();

        return response()->download($zipPath, $zipName)->deleteFileAfterSend(true);
    }
}