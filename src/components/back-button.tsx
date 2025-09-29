
'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function BackButton() {
  const router = useRouter();

  return (
    <Button variant="outline" onClick={() => router.back()} className="mb-8 gap-1">
      <ArrowLeft className="h-4 w-4" />
      Back
    </Button>
  );
}
