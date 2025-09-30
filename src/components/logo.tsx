import { Leaf } from 'lucide-react';
import Image from "next/image";
import MainLogo from '@/components/logo1.png';
import { Separator } from './ui/separator';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={`flex items-center font-headline ${className}`}>
      <Image 
        src={MainLogo}
        alt="LFG Logo"
        width={80}
        height={80}
      />
      <Separator orientation='vertical' className='h-12 mx-3 bg-foreground/50' />
      <div className="flex flex-col">
        <span className="text-lg font-bold text-foreground leading-tight">Light for Generation</span>
        <span className="text-lg font-bold text-foreground leading-tight">Ethiopia</span>
      </div>
    </div>
  );
}
