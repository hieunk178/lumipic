export default function Footer() {
    return (
        <div className="bg-gray-800 p-5 text-white">
            <div className="container flex justify-between mx-auto">
                <div>
                    <h2 className="text-xl font-bold mb-4">About Us</h2>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        In eget odio nec libero fermentum ultricies. 
                        Nullam auctor, libero nec lacinia ultrices, 
                        justo turpis convallis nunc, et ultrices odio ligula vel arcu.
                    </p>
                    <noscript><a href="/" target="_blank"><img  src="//sstatic1.histats.com/0.gif?4938754&101" alt="" border="0"/></a></noscript>
                </div>
                <div>
                    <h2 className="text-xl font-bold mb-4">Contact Us</h2>
                    <p>
                        123 Street Name, City Name, United States
                    </p>
                    <p>
                        Phone: +1 234 567 890
                    </p>
                    <p>
                        Email:
                        <a href="mailto:hieukhac6869@gmail.com" className="text-blue-400">
                            hieukhac6869@gmail.com
                        </a>
                    </p>
                </div>
            </div>
            <div className="border-gray-700 border-t mt-5 pt-5">
                <div className="container flex justify-between items-center mx-auto">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold me-3">Language</h2>
                        <select className="bg-gray-700 p-2 rounded text-white">
                            <option value="en">English</option>
                            <option value="es">Spanish</option>
                            <option value="fr">French</option>
                            <option value="de">German</option>
                        </select>
                    </div>
                    <div className="text-right">
                        <p>&copy; 2025 LumiPic. All rights reserved.</p>
                        <div className="flex justify-end mt-2 space-x-4">
                            <a href="#" className="text-blue-400">
                                <i className="fa-facebook fab"></i>
                            </a>
                            <a href="#" className="text-blue-400">
                                <i className="fa-twitter fab"></i>
                            </a>
                            <a href="#" className="text-blue-400">
                                <i className="fa-instagram fab"></i>
                            </a>
                            <a href="#" className="text-blue-400">
                                <i className="fa-linkedin fab"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}