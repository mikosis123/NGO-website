
'use client';

import { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Briefcase, Newspaper, Image as ImageIcon, FolderUp, Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from '@/components/ui/skeleton';

type OverviewData = {
  projects: number;
  news: number;
  gallery: number;
  resources: number;
  inbox: number;
};

function StatCard({ title, value, icon: Icon, loading }: { title: string, value: number, icon: React.ElementType, loading: boolean }) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    {title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                {loading ? (
                    <Skeleton className="h-8 w-1/4" />
                ) : (
                    <div className="text-2xl font-bold">{value}</div>
                )}
            </CardContent>
        </Card>
    )
}

export default function AdminDashboardPage() {
    const [data, setData] = useState<OverviewData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const collections = {
            projects: collection(db, 'projects'),
            news: collection(db, 'news'),
            gallery: collection(db, 'gallery'),
            resources: collection(db, 'resources'),
            inbox: collection(db, 'contacts'),
        };

        const unsubscribes = Object.entries(collections).map(([key, collectionRef]) => 
            onSnapshot(collectionRef, (snapshot) => {
                setData(prevData => ({
                    ...prevData!,
                    [key]: snapshot.size,
                }));
                setLoading(false);
            }, (error) => {
                console.error(`Error fetching ${key}: `, error);
                setLoading(false);
            })
        );

        // Cleanup listeners on unmount
        return () => unsubscribes.forEach(unsub => unsub());
    }, []);

    const overviewCards = [
        { title: "Projects", value: data?.projects ?? 0, icon: Briefcase },
        { title: "News Articles", value: data?.news ?? 0, icon: Newspaper },
        { title: "Gallery Images", value: data?.gallery ?? 0, icon: ImageIcon },
        { title: "Resources", value: data?.resources ?? 0, icon: FolderUp },
        { title: "Inbox Messages", value: data?.inbox ?? 0, icon: Mail },
    ]

    return (
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:grid-cols-5">
            {overviewCards.map(card => (
                <StatCard 
                    key={card.title} 
                    title={card.title} 
                    value={card.value} 
                    icon={card.icon}
                    loading={loading}
                />
            ))}
        </div>
    );
}
