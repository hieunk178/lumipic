import { useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import axios from "axios";
import GuestLayout from "@/Layouts/GuestLayout";

export default function ImageConverter() {
    const { data, setData, post, processing, progress } = useForm({
        images: [],
        format: "jpg",
    });

    const [images, setImages] = useState([]);

    const handleFileChange = async (e) => {
        const files = Array.from(e.target.files);
        const lengthImages = images.length ?? 0;
        files.forEach((file, index) => {
            const newImage = {
                file,
                name: '',
                path: URL.createObjectURL(file),
                status: "Uploading",
                progress: 0,
            };
            setImages((prev) => [...prev, newImage]);
        });
        files.forEach((file, index) => {
            const formData = new FormData();
            formData.append("image", file);

            axios.post(route("file.upload"), formData, {
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setImages((prev) => {
                        const updatedImages = [...prev];
                        updatedImages[lengthImages + index].progress = percentCompleted;
                        return updatedImages;
                    });
                },
            })
                .then((response) => {
                    setImages((prev) => {
                        const updatedImages = [...prev];
                        updatedImages[lengthImages + index] = {
                            ...updatedImages[lengthImages + index],
                            name: response.data.name,
                            path: response.data.path,
                            status: "Uploaded",
                        };
                        return updatedImages;
                    });
                })
                .catch((error) => {
                    console.error("Lỗi upload:", error);
                    setImages((prev) => {
                        const updatedImages = [...prev];
                        updatedImages[lengthImages + index].status = "Failed";
                        return updatedImages;
                    });
                });
        });
        e.target.value = null;
    };

    const handleConvertSingle = async (index) => {
        const formData = new FormData();
        formData.append("path", images[index].path);
        formData.append("name", images[index].name);
        formData.append("format", data.format);

        axios.post(route("convert.process"), formData, {
            onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                setImages((prev) => {
                    const updatedImages = [...prev];
                    updatedImages[index].progress = percentCompleted;
                    return updatedImages;
                });
            },
        })
            .then((response) => {
                setImages((prev) => {
                    const updatedImages = [...prev];
                    updatedImages[index] = {
                        ...updatedImages[index],
                        path: response.data.path,
                        name: response.data.name,
                        status: "Converted",
                    };
                    return updatedImages;
                });
            })
            .catch((error) => {
                console.error("Lỗi chuyển đổi:", error);
            });
    };

    const handleRemoveImage = (index) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
    };

    const allConverted = images.length > 0 && images.every((img) => img.status === "Converted");

    const handleDownloadAll = async () => {
        try {
            const response = await axios.post(route("file.download"), { images }, {
                responseType: "blob",
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "lumipic-convert.zip");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Lỗi khi tải file ZIP:", error);
        }
    };

    const [isDownloading, setIsDownloading] = useState(false);

    return (
        <GuestLayout>
            <div className="p-5 container mx-auto">
                <Head title="Image Converter" />
                <h2 className="text-2xl font-bold mb-4 text-center">Chuyển đổi hình ảnh của bạn</h2>
                <p className="text-center">Chuyển đổi hình ảnh PNG, GIF, TIF, PSD, SVG, WEBP, HEIC hoặc RAW sang JPG, PNG, WEBP hoặc GIF hàng loạt dễ dàng.</p>
                <p className="text-center my-3">Chọn định dạng bạn muốn chuyển đổi hình ảnh của mình thành và tải lên hình ảnh của bạn bên dưới.</p>
                <div className="flex justify-center items-center mb-3">
                    <label className="w-full max-w-lg p-5 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer flex items-center justify-center" style={{ height: "200px" }}>
                        <span className="text-gray-500">Nhấp để tải lên hoặc kéo và thả</span>
                        <input
                            type="file"
                            multiple
                            onChange={handleFileChange}
                            className="hidden"
                        />
                    </label>
                </div>

                <select value={data.format} onChange={(e) => setData("format", e.target.value)} className="mb-3 block mx-auto">
                    <option value="jpg">JPG</option>
                    <option value="png">PNG</option>
                    <option value="webp">WEBP</option>
                    <option value="gif">GIF</option>
                </select>

                {images.length > 0 && (
                    <div className="mt-5">
                        <h3 className="text-xl font-semibold">Hình ảnh đã tải lên:</h3>
                        <div className="grid grid-cols-1 gap-4 mt-3">
                            <div className="border p-3 rounded flex justify-between">
                                <div className="flex items-center justify-between">
                                    {allConverted ? "Tải xuống tất cả hình ảnh" : "Chuyển đổi tất cả hình ảnh"}
                                </div>
                                <div className="flex items-center justify-between gap-2">
                                    <button onClick={() => setImages([])} className="bg-red-500 text-white px-4 py-2 rounded">
                                        Xóa tất cả
                                    </button>
                                    {allConverted ? (
                                        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={async () => {
                                            setIsDownloading(true);
                                            await handleDownloadAll();
                                            setIsDownloading(false);
                                        }}>
                                            {isDownloading ? "Đang chuẩn bị file..." : "Tải xuống tất cả"}
                                        </button>
                                    ) : (
                                        <button onClick={() => images.forEach((_, index) => handleConvertSingle(index))} className="bg-blue-500 text-white px-4 py-2 rounded">
                                            Chuyển đổi tất cả
                                        </button>
                                    )}
                                </div>
                            </div>
                            {images.map((img, index) => (
                                <div key={index} className="border p-3 rounded">
                                    <div className="flex items-center justify-between">
                                        <div className="w-20 h-20 mr-3">
                                            <img src={img.path} alt={`Uploaded ${index}`} className="w-full h-full object-cover border rounded" />
                                        </div>
                                        <p className="font-semibold truncate w-1/4">{img.name}</p>
                                        <p className="w-1/4 text-right flex justify-center">
                                            <span className={`text-sm p-1 px-2 rounded-sm ${img.status === "Uploading" ? "bg-yellow-200" : img.status === "Uploaded" ? "bg-green-200" : img.status === "Converted" ? "bg-blue-200" : img.status === "Failed" ? "bg-red-200" : "bg-gray-200"}`}>
                                                {img.status === "Converting" ? "Đang chuyển đổi" : img.status}
                                            </span>
                                        </p>
                                        <div className="w-1/4 flex justify-center items-center">
                                            {(img.status === "Uploading" || img.status === "Converting") && (
                                                <div className="bg-gray-200 h-2.5 rounded-full w-1/2">
                                                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${img.progress}%` }}></div>
                                                </div>
                                            )}
                                        </div>
                                        <div className="w-1/4 text-right flex items-center justify-end">
                                            {img.status === "Failed" && (
                                                <button onClick={() => handleFileChange({ target: { files: [img.file] } })} className="bg-blue-500 text-white px-4 py-2 rounded">
                                                    Thử lại
                                                </button>
                                            )}
                                            {img.status === "Uploaded" && (
                                                <button onClick={() => handleConvertSingle(index)} className="bg-blue-500 text-white px-4 py-2 rounded">
                                                    Chuyển đổi
                                                </button>
                                            )}
                                            {img.status === "Converted" && (
                                                <a href={img.path} download={img.name} className="bg-blue-500 text-white px-4 py-2 rounded">
                                                    Tải xuống
                                                </a>
                                            )}
                                            <button onClick={() => handleRemoveImage(index)} className="ml-2 text-red-500">
                                                ✖
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </GuestLayout>
    );
}
