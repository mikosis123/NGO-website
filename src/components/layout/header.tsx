
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Heart } from 'lucide-react';
import { useState, useEffect } from 'react';
import Image from "next/image";
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import  {Logo}  from '@/components/logo';
import { navLinks } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import type { NavLink } from '@/lib/types';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith('/admin');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isAdminPage) {
    return null;
  }

  return (
    <header className={cn(
        "fixed top-0 z-50 transition-all duration-300",
        isAdminPage 
            ? "w-full border-b bg-background" 
            : "left-1/2 -translate-x-1/2 w-[85%] rounded-lg mt-4",
        scrolled || isAdminPage ? "border-b bg-white" : "bg-white",
        !isAdminPage && "mt-4"
    )}>
      <div className="container flex h-20 items-center px-4">
        <Link href="/" className="flex items-center space-x-2">
        <Logo />
        </Link>
        <div className="flex-1 flex justify-center">
          <nav className="hidden md:flex items-center space-x-8 text-base font-medium">
            {navLinks.map((link: NavLink) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'transition-colors hover:text-accent',
                  pathname === link.href ? 'text-accent' : 'text-foreground/70'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center justify-end space-x-4">
          <Button asChild className="hidden md:inline-flex bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white">
            <Link href="/donate">
                <Heart className="mr-2 h-4 w-4" />
                Donate
            </Link>
          </Button>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" className={cn("md:hidden", "text-foreground hover:text-foreground hover:bg-black/10")}>
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex justify-between items-center mb-8">
                <Logo />
              </div>
              <nav className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                        "text-lg font-medium transition-colors hover:text-accent",
                        pathname === link.href ? 'text-accent' : 'text-foreground/80'
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <Button asChild className="w-full mt-8 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white">
                <Link href="/donate" onClick={() => setIsOpen(false)}>
                    <Heart className="mr-2 h-4 w-4" />
                    Donate
                </Link>
              </Button>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
