export default function Header() {
    return (
        <header className="border-b sticky top-0 z-50 bg-white dark:bg-gray-800 dark:border-gray-700">
            <div className="container mx-auto">
                <div className="font-sans text-gray-900 dark:text-gray-100 ">
                    <div className="flex items-center bg-white dark:bg-gray-800 dark:border-gray-700">
                        <div className="flex items-center space-x-4 lg:space-x-0">
                            <a href="/" className="text-lg font-semibold leading-none">
                                <img src="/images/lumipic-logo.png" alt="Logo" className="h-20" />
                            </a>
                        </div>

                        <div className="flex items-center space-x-4 lg:space-x-0 h-full">
                            <a href="/compress" className="font-semibold leading-none h-full px-4 text-xl">Nén ảnh</a>
                            <a href="/converter" className="font-semibold leading-none h-full px-4 text-xl">Chuyển đổi ảnh</a>
                            <a href="/resize" className="font-semibold leading-none h-full px-4 text-xl">Thay đổi kích thước ảnh</a>
                            <a href="/crop" className="font-semibold leading-none h-full px-4 text-xl">Cắt ảnh</a>
                            <a href="/add-watermark" className="font-semibold leading-none h-full px-4 text-xl">Thêm Watermark</a>
                            <a href="/convert-to-jpg" className="font-semibold leading-none h-full px-4 text-xl">Chuyển đổi sang JPG</a>
                        </div>
                        <div className="flex items-center justify-end space-x-4 lg:space-x-0 h-full grow">
                            <div className="relative group">
                                <button className="font-semibold leading-none h-full px-4 text-xl">Ngôn ngữ</button>
                                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <a href="/lang/en" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">English</a>
                                    <a href="/lang/vi" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Tiếng Việt</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}