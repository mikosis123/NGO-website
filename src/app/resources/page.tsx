
import { mockResources } from '@/lib/mock-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Download } from 'lucide-react';

export default function ResourcesPage() {
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
            {mockResources.map(resource => (
            <Card key={resource.id} className="flex flex-col bg-background">
                <CardHeader className="flex-row items-start gap-4 space-y-0">
                <div className="bg-primary/10 text-primary p-3 rounded-full">
                    <resource.icon className="h-6 w-6" />
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
                    <Link href={resource.fileUrl} target="_blank">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                    </Link>
                </Button>
                </div>
            </Card>
            ))}
        </div>
        </div>
    </div>
  );
}
