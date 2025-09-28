import { Leaf } from 'lucide-react';
import Image from "next/image";
import MainLogo from '@/components/logo1.png';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={`flex items-center font-headline`}>
      {/* <Leaf className="h-6 w-6 mr-2 text-primary" /> */}
      <Image 
        src={MainLogo}   // path inside public/
        alt="LFG Logo"
        width={80}
        height={80}
      />
    </div>
  );
}
