'use client';

import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { useIsLoggedInStore } from '@/app/store';
import { useRouter } from 'next/navigation';

export default function AppBar() {
  const router = useRouter();
  const isLoggedIn = useIsLoggedInStore((state) => state.isLoggedIn);
  const setIsLoggedIn = useIsLoggedInStore((state) => state.setIsLoggedIn);

  const handleLoginLogoutClick = () => {
    if (!isLoggedIn) {
      router.push('/login');
    } else {
      setIsLoggedIn(false);
      router.push('/');
    }
  };

  return (
    <header className="flex h-16 shrink-0 justify-between items-center border-b px-4">
      <span>Praxis Reviews</span>
      <div className="flex gap-2">
        <ThemeToggle className="" />
        <Button variant="outline" onClick={handleLoginLogoutClick}>
          {isLoggedIn ? (
            <span>Abmelden</span>
          ) : (
            <Link className="cursor-default" href="/login">
              Anmelden
            </Link>
          )}
        </Button>
      </div>
    </header>
  );
}
