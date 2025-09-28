import { Leaf } from 'lucide-react';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={`flex items-center font-headline text-2xl font-bold ${className}`}>
      <Leaf className="h-7 w-7 mr-2 text-primary" />
      <span className="text-foreground">Empower</span>
      <span className="text-primary">Change</span>
    </div>
  );
}
