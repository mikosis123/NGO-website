'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Logo } from '@/components/logo';
import { navLinks } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import type { NavLink } from '@/lib/types';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        scrolled ? "border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" : "bg-black/20",
        "mt-4"
    )}>
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Logo />
        </Link>
        <div className="flex-1 flex justify-center">
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            {navLinks.map((link: NavLink) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'transition-colors hover:text-primary',
                  pathname === link.href ? 'text-primary' : (scrolled ? 'text-foreground/60' : 'text-white/80 hover:text-white')
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center justify-end space-x-4">
          <Button asChild className="hidden md:inline-flex bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href="/donate">Donate</Link>
          </Button>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" className={cn("md:hidden", !scrolled && "text-white hover:text-white hover:bg-white/10")}>
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex justify-between items-center mb-8">
                <Logo />
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X className="h-6 w-6" />
                  <span className="sr-only">Close Menu</span>
                </Button>
              </div>
              <nav className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                        "text-lg font-medium transition-colors hover:text-primary",
                        pathname === link.href ? 'text-primary' : 'text-foreground/80'
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <Button asChild className="w-full mt-8 bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="/donate" onClick={() => setIsOpen(false)}>Donate</Link>
              </Button>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
