import Header from './Header';
import Footer from './Footer';

export default function GuestLayout({ children }) {
    return (
        <div className="">
            <Header />
            <main className="min-h-screen">
                {children}
            </main>
            <Footer />
        </div>
    );
}
