import { Leaf } from 'lucide-react';
import Image from "next/image";
import MainLogo from '@/components/logo1.png';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={`flex items-center font-headline ${className}`}>
      <Image 
        src={MainLogo}
        alt="LFG Logo"
        width={80}
        height={80}
      />
      <span className="ml-2 text-lg font-bold text-foreground">Light for Generation Ethiopia</span>
    </div>
  );
}
