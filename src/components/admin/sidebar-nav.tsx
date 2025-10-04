

'use client';

import {
  Home,
  Newspaper,
  Calendar,
  FolderUp,
  HandCoins,
  Mail,
  Briefcase,
  PanelLeft,
  Image as GalleryIcon,
  LogOut,
  Users,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Logo } from '../logo';
import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useSidebar } from '@/hooks/use-sidebar';
import { useAuth } from '@/firebase/provider';
import { signOut } from 'firebase/auth';
import { toast } from '@/hooks/use-toast';

const adminNavLinks = [
  { href: '/admin', label: 'Dashboard', icon: Home },
  { href: '/admin/projects', label: 'Projects', icon: Briefcase },
  { href: '/admin/news', label: 'News', icon: Newspaper },
  { href: '/admin/gallery', label: 'Gallery', icon: GalleryIcon },
  { href: '/admin/resources', label: 'Resources', icon: FolderUp },
  { href: '/admin/donations', label: 'Donations', icon: HandCoins },
  { href: '/admin/inbox', label: 'Inbox', icon: Mail },
  { href: '/admin/subscribers', label: 'Subscribers', icon: Users },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" side="left" variant="sidebar">
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {adminNavLinks.map((link) => (
            <SidebarMenuItem key={link.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === link.href}
                tooltip={{ children: link.label }}
              >
                <Link href={link.href}>
                  <link.icon />
                  <span>{link.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}

export function AdminHeader() {
    const { isMobile, toggleSidebar } = useSidebar();
    const auth = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            toast({
                title: "Logged Out",
                description: "You have been successfully logged out.",
            });
            router.push('/login');
        } catch (error) {
            console.error("Logout Error:", error);
            toast({
                title: "Logout Failed",
                description: "An error occurred while logging out. Please try again.",
                variant: "destructive",
            });
        }
    };
    
    return (
        <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6">
            <Button variant="outline" size="icon" className="shrink-0 md:hidden" onClick={toggleSidebar}>
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
            </Button>
            <div className="w-full flex-1">
                {/* Optional: Add a global search form here */}
            </div>
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="icon" className="rounded-full">
                <Avatar>
                    <AvatarImage src="https://picsum.photos/seed/admin/100/100" alt="Admin" data-ai-hint="person face" />
                    <AvatarFallback>A</AvatarFallback>
                </Avatar>
                <span className="sr-only">Toggle user menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:bg-destructive/10 focus:text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu>
        </header>
    )
}
