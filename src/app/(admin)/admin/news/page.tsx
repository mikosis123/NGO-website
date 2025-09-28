
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";

export default function AdminNewsPage() {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>News Articles</CardTitle>
                    <CardDescription>Create and manage news articles.</CardDescription>
                </div>
                <Button size="sm" className="gap-1">
                    <PlusCircle className="h-4 w-4" />
                    New Article
                </Button>
            </CardHeader>
            <CardContent>
                <p>A table of news articles will be displayed here, with options to create and edit.</p>
            </CardContent>
        </Card>
    )
}
