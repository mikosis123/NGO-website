
'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Download, FileText } from 'lucide-react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Resource } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

type DbResource = Omit<Resource, 'icon'> & { id: string };

function ResourceCardSkeleton() {
    return (
        <Card className="flex flex-col bg-background">
            <CardHeader className="flex-row items-start gap-4 space-y-0">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                    <Skeleton className="h-5 w-40" />
                </div>
            </CardHeader>
            <CardContent className="flex-grow space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
            </CardContent>
            <div className="p-6 pt-0">
                <Skeleton className="h-10 w-full" />
            </div>
        </Card>
    );
}

export default function ResourcesPage() {
  const [resources, setResources] = useState<DbResource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'resources'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
        const resourcesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as DbResource));
        setResources(resourcesData);
        setLoading(false);
    }, (error) => {
        console.error("Error fetching resources: ", error);
        setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="bg-secondary/50">
        <div className="container mx-auto px-4 py-12 md:py-20 pt-32 md:pt-32">
        <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="font-headline text-4xl md:text-5xl font-bold">Resources & Reports</h1>
            <p className="mt-4 text-lg md:text-xl text-muted-foreground">
                Explore our research, reports, and publications to learn more about our impact and the issues we're tackling.
            </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {loading ? (
                Array.from({ length: 3 }).map((_, i) => <ResourceCardSkeleton key={i} />)
            ) : resources.length === 0 ? (
                <p className="text-center col-span-full">No resources available yet.</p>
            ) : (
                resources.map(resource => (
                <Card key={resource.id} className="flex flex-col bg-background">
                    <CardHeader className="flex-row items-start gap-4 space-y-0">
                    <div className="bg-primary/10 text-primary p-3 rounded-full">
                        <FileText className="h-6 w-6" />
                    </div>
                    <div>
                        <CardTitle className="font-headline text-xl">{resource.title}</CardTitle>
                    </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                    <CardDescription>{resource.description}</CardDescription>
                    </CardContent>
                    <div className="p-6 pt-0">
                    <Button asChild variant="outline" className="w-full">
                        <Link href={resource.fileUrl} target="_blank" rel="noopener noreferrer">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                        </Link>
                    </Button>
                    </div>
                </Card>
                ))
            )}
        </div>
        </div>
    </div>
  );
}
