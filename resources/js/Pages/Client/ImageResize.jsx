import React, { useState } from "react";

const ResizeImage = () => {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [width, setWidth] = useState("");
    const [height, setHeight] = useState("");
    const [resizeType, setResizeType] = useState("pixel");

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onload = () => setPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleResize = () => {
        if (!image || (!width && !height)) return;

        const img = new Image();
        img.src = preview;
        img.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            let newWidth = img.width;
            let newHeight = img.height;

            if (resizeType === "pixel") {
                newWidth = width ? parseInt(width) : img.width;
                newHeight = height ? parseInt(height) : img.height;
            } else if (resizeType === "percent") {
                const scaleWidth = width ? parseFloat(width) / 100 : 1;
                const scaleHeight = height ? parseFloat(height) / 100 : 1;
                newWidth = img.width * scaleWidth;
                newHeight = img.height * scaleHeight;
            }

            canvas.width = newWidth;
            canvas.height = newHeight;
            ctx.drawImage(img, 0, 0, newWidth, newHeight);

            const resizedImage = canvas.toDataURL(image.type);
            setPreview(resizedImage);
        };
    };

    return (
        <div className="p-6 max-w-4xl mx-auto text-center">
            <h1 className="text-2xl font-bold mb-2">Resize Image</h1>
            <p className="text-gray-600 mb-6">Easily resize your images by pixel or percentage.</p>
            <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 mx-auto"
                style={{ width: "300px", height: "200px" }}
                onClick={() => document.getElementById("fileInput").click()}
            >
                <input
                    id="fileInput"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                />
                <p className="text-gray-500">Click to select an image or drag and drop here</p>
            </div>
            {preview && (
                <div className="mt-4">
                    <img src={preview} alt="Preview" className="max-w-full rounded-lg" />
                </div>
            )}
            <div className="mt-6">
                <div className="flex justify-center space-x-4">
                    <button
                        className={`px-4 py-2 rounded-lg ${
                            resizeType === "pixel"
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200 text-gray-700"
                        }`}
                        onClick={() => setResizeType("pixel")}
                    >
                        Pixel
                    </button>
                    <button
                        className={`px-4 py-2 rounded-lg ${
                            resizeType === "percent"
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200 text-gray-700"
                        }`}
                        onClick={() => setResizeType("percent")}
                    >
                        Percent
                    </button>
                </div>
                {resizeType === "pixel" ? (
                    <div className="mt-4 space-y-4">
                        <div>
                            <label className="block text-gray-700">Width (px):</label>
                            <input
                                type="number"
                                value={width}
                                onChange={(e) => setWidth(e.target.value)}
                                placeholder="Width"
                                className="w-full border rounded-lg px-4 py-2"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700">Height (px):</label>
                            <input
                                type="number"
                                value={height}
                                onChange={(e) => setHeight(e.target.value)}
                                placeholder="Height"
                                className="w-full border rounded-lg px-4 py-2"
                            />
                        </div>
                    </div>
                ) : (
                    <div className="mt-4">
                        <label className="block text-gray-700">Resize Percentage:</label>
                        <input
                            type="range"
                            min="1"
                            max="200"
                            value={width || 100}
                            onChange={(e) => setWidth(e.target.value)}
                            className="w-full"
                        />
                        <p className="text-gray-500 text-sm mt-2">{width || 100}%</p>
                    </div>
                )}
            </div>
            <button
                onClick={handleResize}
                className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
            >
                Resize
            </button>
        </div>
    );
};

export default ResizeImage;