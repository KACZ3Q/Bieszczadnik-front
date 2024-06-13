import Link from 'next/link';
import { FaUser, FaSearch } from 'react-icons/fa';

export default function Navbar() {
    return (
        <nav className="bg-[#434815bc] text-white p-4 fixed top-0 w-full z-50">
            <div className="container mx-auto flex justify-between items-center">
                <div>
                    <Link href="/szlaki">
                        Szlaki
                    </Link>
                </div>
                <div className="text-xl font-bold text-center">
                    <Link href="/">
                        Bieszczadnik
                    </Link>
                </div>
                <div className="flex space-x-4">
                    <FaSearch className="text-lg cursor-pointer" />
                    <FaUser className="text-lg cursor-pointer" />
                </div>
            </div>
        </nav>
    );
}
