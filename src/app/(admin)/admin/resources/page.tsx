
'use client';

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
import { ResourceForm } from "./resource-form";
import { ResourcesTable } from "./resources-table";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function AdminResourcesPage() {
    const [dialogOpen, setDialogOpen] = useState(false);

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Resources & Reports</CardTitle>
                    <CardDescription>Upload and manage documents.</CardDescription>
                </div>
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                        <Button size="sm" className="gap-1">
                            <PlusCircle className="h-4 w-4" />
                            Add Resource
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[625px]">
                        <DialogHeader>
                        <DialogTitle>Add a New Resource</DialogTitle>
                        <DialogDescription>
                            Fill out the form below to add a new resource.
                        </DialogDescription>
                        </DialogHeader>
                        <ScrollArea className="max-h-[70vh] p-4">
                            <ResourceForm onFinished={() => setDialogOpen(false)} />
                        </ScrollArea>
                    </DialogContent>
                </Dialog>
            </CardHeader>
            <CardContent>
                <ResourcesTable />
            </CardContent>
        </Card>
    )
}
