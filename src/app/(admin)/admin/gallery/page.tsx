
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
import { GalleryForm } from "./gallery-form";


export default function AdminGalleryPage() {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Gallery Management</CardTitle>
                    <CardDescription>Add or remove images from the gallery.</CardDescription>
                </div>
                 <Dialog>
                    <DialogTrigger asChild>
                        <Button size="sm" className="gap-1">
                            <PlusCircle className="h-4 w-4" />
                            Add Image
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                        <DialogTitle>Add a New Image</DialogTitle>
                        <DialogDescription>
                            Fill out the form below to add a new image to the gallery.
                        </DialogDescription>
                        </DialogHeader>
                        <GalleryForm />
                    </DialogContent>
                </Dialog>
            </CardHeader>
            <CardContent>
                <p>A grid of gallery images will be displayed here, with options to edit or delete.</p>
            </CardContent>
        </Card>
    )
}
