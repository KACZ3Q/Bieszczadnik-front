import Link from 'next/link';
import { FaUser, FaSearch } from 'react-icons/fa';

export default function Navbar() {
    return (
        <nav className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div>
                    <Link href="/szlaki" className="text-lg">
                        Szlaki
                    </Link>
                </div>
                <div className="text-xl font-bold text-center">
                    <Link href="/">Bieszczadnik</Link>
                </div>
                <div className="flex space-x-4">
                    <FaSearch className="text-lg cursor-pointer" />
                    <FaUser className="text-lg cursor-pointer" />
                </div>
            </div>
        </nav>
    );
}
