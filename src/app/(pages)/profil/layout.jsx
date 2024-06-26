import Link from "next/link";
import { FaRegCircleUser } from "react-icons/fa6";
import { MdFavoriteBorder } from "react-icons/md";
import LogoutButton from "@/app/_components/LogoutButton";

const navItemClass = "flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-50 text-xl";

function NavItem({ href, icon, label }) {
  return (
    <li>
      <Link href={href} className={navItemClass}>
        {icon}
        {label}
      </Link>
    </li>
  );
}

export default function SimpleDashboardLayout({ children }) {
  return (
    <div className="h-screen grid grid-cols-[200px_1fr]">
      <nav className="bg-gray-100 dark:bg-gray-800 p-4 h-full flex flex-col justify-between">
        <ul className="flex flex-col gap-5 mt-16">
          <NavItem href="/profil" icon={<FaRegCircleUser className="h-7 w-7" />} label="Profil" />
          <NavItem href="/profil/ulubione" icon={<MdFavoriteBorder className="h-7 w-7" />} label="Ulubione" />
        </ul>
        <div className="mt-auto">
          <LogoutButton />
        </div>
      </nav>
      <main className="p-4 overflow-auto h-full">
        {children}
      </main>
    </div>
  );
}
