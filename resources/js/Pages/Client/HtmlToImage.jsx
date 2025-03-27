import React, { useState } from "react";
import GuestLayout from "../../Layouts/GuestLayout";

export default function HtmlToImage() {
    const [url, setUrl] = useState("");
    const [image, setImage] = useState(null);

    const handleUrlChange = (e) => {
        setUrl(e.target.value);
    };

    const handleConvert = async () => {
        try {
            
        } catch (error) {
            console.error("Error capturing screenshot:", error);
        }
    };

    return (
        <GuestLayout>
            <div className="p-5 container mx-auto">
                <h1 className="text-2xl font-bold mb-2">URL to Image</h1>
                <p className="text-gray-600 mb-6">Enter a URL to capture the webpage as an image.</p>
                <div className="flex flex-col items-center space-y-4">
                    <input
                        type="text"
                        className="border border-gray-300 rounded-lg p-2 w-full"
                        placeholder="Enter the URL here..."
                        value={url}
                        onChange={handleUrlChange}
                    />
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                        onClick={handleConvert}
                    >
                        Capture
                    </button>
                </div>
                {image && (
                    <div className="mt-6">
                        <h2 className="text-xl font-bold mb-2">Result</h2>
                        <img src={image} alt="Result" />
                    </div>
                )}
            </div>
        </GuestLayout>
    );
}
