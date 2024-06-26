"use client";

import Link from 'next/link';
import { FaUser, FaSearch } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { getUser, logoutAction } from '@/data/actions/auth';

export default function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkUserStatus = async () => {
            const user = await getUser();
            setIsLoggedIn(!!user);
        };

        checkUserStatus();
    }, []);

    const handleLogout = async () => {
        await logoutAction();
        setIsLoggedIn(false);
        window.location.href = '/';
    };

    return (
        <nav className="bg-[#6c7141] text-white p-4 fixed top-0 w-full z-50">
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
                <div className="flex space-x-4 items-center">
                    <FaSearch className="text-lg cursor-pointer" />
                    <Link href={isLoggedIn ? "/profil" : "/logowanie"}>
                        <FaUser className="text-lg cursor-pointer" />
                    </Link>
                </div>
            </div>
        </nav>
    );
}
