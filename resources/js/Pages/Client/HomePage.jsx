import { Head, Link } from '@inertiajs/react';
import { Card } from "@/components/ui/card"
import {
    Image,
    Scissors,
    Maximize2,
    FileImageIcon as FileJpg,
    Pencil,
    Stamp,
    SmilePlus,
    RotateCw,
    FileCode,
    ArrowUpCircle,
    Eraser,
} from "lucide-react";
import GuestLayout from '@/Layouts/GuestLayout';
import { useEffect } from 'react';

const tools = [
    {
        icon: <Image className="w-8 h-8 text-green-500" />,
        title: "Nén ẢNH",
        description: "Nén JPG, PNG, SVG và GIF trong khi tiết kiệm không gian và duy trì chất lượng.",
        link: "/compress"
    },
    {
        icon: <Image className="w-8 h-8 text-blue-500" />,
        title: "Chuyên đổi định dạng ảnh",
        description: "Chuyển đổi JPG, PNG, WEBP sang định dạng ảnh khác một cách dễ dàng.",
        link: "/converter"
    },
    {
        icon: <Maximize2 className="w-8 h-8 text-blue-500" />,
        title: "Thay đổi kích thước ẢNH",
        description: "Định nghĩa kích thước của bạn, theo phần trăm hoặc pixel, và thay đổi kích thước ảnh JPG, PNG, SVG và GIF của bạn.",
        link: "/resize"
    },
    {
        icon: <Scissors className="w-8 h-8 text-cyan-500" />,
        title: "Cắt ẢNH",
        description: "Cắt JPG, PNG hoặc GIF dễ dàng. Chọn pixel để xác định hình chữ nhật của bạn hoặc sử dụng trình chỉnh sửa trực quan của chúng tôi.",
        link: "/crop"
    },
    {
        icon: <FileJpg className="w-8 h-8 text-yellow-500" />,
        title: "Chuyển đổi sang JPG",
        description: "Chuyển đổi ảnh PNG, GIF, TIF, PSD, SVG, WEBP, HEIC hoặc RAW sang JPG hàng loạt dễ dàng.",
        link: "/convert-to-jpg"
    },
    {
        icon: <Pencil className="w-8 h-8 text-purple-500" />,
        title: "Trình chỉnh sửa ảnh",
        description: "Làm đẹp ảnh của bạn với văn bản, hiệu ứng, khung hoặc nhãn dán. Công cụ chỉnh sửa đơn giản cho nhu cầu hình ảnh của bạn.",
        link: "/photo-editor"
    },
    {
        icon: <ArrowUpCircle className="w-8 h-8 text-blue-500" />,
        title: "Nâng cấp Ảnh",
        description: "Phóng to ảnh của bạn với độ phân giải cao. Dễ dàng tăng kích thước ảnh JPG và PNG của bạn trong khi duy trì chất lượng hình ảnh.",
        link: "/enhance"
    },
    {
        icon: <Eraser className="w-8 h-8 text-green-500" />,
        title: "Xóa nền",
        description: "Nhanh chóng xóa nền ảnh với độ chính xác cao. Phát hiện đối tượng và cắt nền dễ dàng.",
        link: "/remove-background"
    },
    {
        icon: <Stamp className="w-8 h-8 text-blue-500" />,
        title: "Đóng dấu ẢNH",
        description: "Đóng dấu một hình ảnh hoặc văn bản lên ảnh của bạn trong vài giây. Chọn kiểu chữ, độ trong suốt và vị trí.",
        link: "/watermark"
    },
    {
        icon: <SmilePlus className="w-8 h-8 text-purple-500" />,
        title: "Trình tạo meme",
        description: "Tạo meme của bạn trực tuyến dễ dàng. Chú thích hình ảnh meme hoặc tải lên ảnh của bạn để tạo meme tùy chỉnh.",
        link: "/meme-generator"
    },
    {
        icon: <RotateCw className="w-8 h-8 text-cyan-500" />,
        title: "Xoay ẢNH",
        description: "Xoay nhiều ảnh JPG, PNG hoặc GIF cùng một lúc. Chọn xoay chỉ ảnh ngang hoặc dọc!",
        link: "/rotate"
    },
    {
        icon: <FileCode className="w-8 h-8 text-yellow-500" />,
        title: "HTML sang ẢNH",
        description: "Chuyển đổi trang web HTML sang JPG hoặc SVG. Sao chép và dán URL của trang bạn muốn và chuyển đổi nó sang ẢNH chỉ với một cú nhấp chuột.",
        link: "/html-to-image"
    },
];

export default function HomePage() {
    useEffect(() => {
        const counters = document.querySelectorAll('.counter');
        const speed = 200; // The lower the slower

        const animateCounters = () => {
            counters.forEach(counter => {
                const updateCount = () => {
                    const target = +counter.getAttribute('data-target');
                    const count = +counter.innerText;

                    const increment = target / speed;

                    if (count < target) {
                        counter.innerText = Math.ceil(count + increment);
                        setTimeout(updateCount, 1);
                    } else {
                        counter.innerText = target;
                    }
                };

                const observer = new IntersectionObserver(entries => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            updateCount();
                            observer.unobserve(entry.target);
                        }
                    });
                });

                observer.observe(counter);
            });
        };

        animateCounters();
    }, []);

    return (
        <GuestLayout>
            <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
                <Head title="Trang chủ" />
                <div className="py-12 container mx-auto">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
                            Công cụ chỉnh sửa ảnh mạnh mẽ và miễn phí
                        </h1>
                        <p className="text-xl text-muted-foreground">Khám phá các công cụ chỉnh sửa ảnh trực tuyến tốt nhất của chúng tôi!</p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {tools.map((tool, index) => (
                            <Link href={tool.link} key={index} className="h-full">
                                <Card className="p-6 hover:shadow-lg transition-shadow h-full">
                                    <div className="mb-4">{tool.icon}</div>
                                    <h3 className="text-xl font-semibold mb-2">{tool.title}</h3>
                                    <p className="text-muted-foreground">{tool.description}</p>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="my-16 container mx-auto p-8 bg-white rounded-lg shadow-lg">
                    <h2 className="text-3xl font-bold text-center mb-8">Những con số biết nói</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { number: 1000, label: "Người dùng" },
                            { number: 500, label: "Công cụ" },
                            { number: 2000, label: "Ảnh đã chỉnh sửa" },
                        ].map((item, index) => (
                            <div key={index} className="text-center">
                                <div className="text-5xl font-bold text-blue-500">
                                    <span className="counter" data-target={item.number}>0</span>+
                                </div>
                                <div className="text-xl text-muted-foreground">{item.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
