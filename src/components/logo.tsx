import { Leaf } from 'lucide-react';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={`flex items-center font-headline text-xl font-bold ${className}`}>
      <Leaf className="h-6 w-6 mr-2 text-primary" />
      <span className="text-foreground">Empower</span>
      <span className="text-primary">Change</span>
    </div>
  );
}
