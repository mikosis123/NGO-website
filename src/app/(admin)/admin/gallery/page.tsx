
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { GalleryForm } from "./gallery-form";
import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query, doc, deleteDoc } from "firebase/firestore";
import { db, storage } from "@/lib/firebase";
import { deleteObject, ref } from "firebase/storage";
import Image from "next/image";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";

type GalleryImage = {
  id: string;
  imageUrl: string;
  description: string;
  storagePath: string;
}

export default function AdminGalleryPage() {
    const [open, setOpen] = useState(false);
    const [images, setImages] = useState<GalleryImage[]>([]);
    const [loading, setLoading] = useState(true);
    const [imageToDelete, setImageToDelete] = useState<GalleryImage | null>(null);

    useEffect(() => {
        const q = query(collection(db, 'gallery'), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const imagesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as GalleryImage));
            setImages(imagesData);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching gallery images: ", error);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const handleDeleteClick = (image: GalleryImage) => {
      setImageToDelete(image);
    };

    const handleConfirmDelete = async () => {
      if (imageToDelete) {
        try {
          // Delete from Firestore
          await deleteDoc(doc(db, "gallery", imageToDelete.id));

          // Delete from Firebase Storage
          const storageRef = ref(storage, imageToDelete.storagePath);
          await deleteObject(storageRef);

          toast({
            title: "Image Deleted",
            description: "The image has been successfully removed from the gallery.",
          });
        } catch (error) {
          toast({
            title: "Error Deleting Image",
            description: "There was an error deleting the image. Please try again.",
            variant: "destructive",
          });
          console.error("Error deleting image: ", error);
        } finally {
          setImageToDelete(null);
        }
      }
    };

    return (
        <>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Gallery Management</CardTitle>
                        <CardDescription>Add or remove images from the gallery.</CardDescription>
                    </div>
                    <Dialog open={open} onOpenChange={setOpen}>
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
                            <GalleryForm onFinished={() => setOpen(false)} />
                        </DialogContent>
                    </Dialog>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <p>Loading images...</p>
                    ) : images.length === 0 ? (
                        <p>No images in the gallery yet. Add one to get started.</p>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {images.map(image => (
                                <div key={image.id} className="relative group">
                                    <Image 
                                        src={image.imageUrl} 
                                        alt={image.description}
                                        width={200}
                                        height={200}
                                        className="rounded-lg object-cover aspect-square"
                                    />
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2 rounded-lg">
                                        <p className="text-white text-xs text-center mb-2">{image.description}</p>
                                        <Button 
                                          variant="destructive" 
                                          size="icon"
                                          onClick={() => handleDeleteClick(image)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                            <span className="sr-only">Delete image</span>
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

            <AlertDialog open={!!imageToDelete} onOpenChange={() => setImageToDelete(null)}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the
                    image from your gallery.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleConfirmDelete}
                    className="bg-destructive hover:bg-destructive/90"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
