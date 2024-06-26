import { CiLogout } from "react-icons/ci";
import { Button } from '@/components/ui/button';
import { logoutAction } from '@/data/actions/auth';

export default function LogoutButton() {
  return (
    <form action={logoutAction}>
      <Button className="gap-2 text-sm sm:text-base md:text-lg lg:text-xl xl:text-lg" type="submit">
        Wyloguj
        <CiLogout className="text-2xl sm:text-2xl md:text-2xl lg:text-3xl xl:text-3xl cursor-pointer" />
      </Button>
    </form>
  );
}
