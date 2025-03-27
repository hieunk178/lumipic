<?php 

namespace App\Http\Controllers;

use Inertia\Inertia;

class HtmlToImageController extends Controller
{
    public function htmlToImage()
    {
        return Inertia::render('Client/HtmlToImage');
    }
}