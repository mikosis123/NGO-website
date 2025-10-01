
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { NewsForm } from "./news-form";
import { NewsTable } from "./news-table";


export default function AdminNewsPage() {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>News Articles</CardTitle>
                    <CardDescription>Create and manage news articles.</CardDescription>
                </div>
                 <Dialog>
                    <DialogTrigger asChild>
                        <Button size="sm" className="gap-1">
                            <PlusCircle className="h-4 w-4" />
                            New Article
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                        <DialogTitle>Add a New Article</DialogTitle>
                        <DialogDescription>
                            Fill out the form below to create a new news article.
                        </DialogDescription>
                        </DialogHeader>
                        <NewsForm />
                    </DialogContent>
                </Dialog>
            </CardHeader>
            <CardContent>
                <NewsTable />
            </CardContent>
        </Card>
    )
}
