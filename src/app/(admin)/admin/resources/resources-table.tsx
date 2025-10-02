
'use client';

import { useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Resource } from '@/lib/types';
import { format } from 'date-fns';
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
import { toast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ResourceForm } from './resource-form';

type DbResource = Omit<Resource, 'icon'> & {
    id: string;
    createdAt: Date;
}

export function ResourcesTable() {
  const [resources, setResources] = useState<DbResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [resourceToDelete, setResourceToDelete] = useState<DbResource | null>(null);
  const [resourceToEdit, setResourceToEdit] = useState<DbResource | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  useEffect(() => {
    const q = query(collection(db, 'resources'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const resourcesData: DbResource[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        resourcesData.push({
          id: doc.id,
          title: data.title,
          description: data.description,
          fileUrl: data.fileUrl,
          createdAt: data.createdAt.toDate(),
        });
      });
      setResources(resourcesData);
      setLoading(false);
    }, (error) => {
        console.error("Error fetching resources: ", error);
        setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleDeleteClick = (resource: DbResource) => {
    setResourceToDelete(resource);
  };

  const handleEditClick = (resource: DbResource) => {
    setResourceToEdit(resource);
    setEditDialogOpen(true);
  }

  const handleConfirmDelete = async () => {
    if (resourceToDelete) {
      try {
        await deleteDoc(doc(db, "resources", resourceToDelete.id));
        toast({
          title: "Resource Deleted",
          description: `The resource "${resourceToDelete.title}" has been successfully deleted.`,
        });
      } catch (error) {
        toast({
          title: "Error Deleting Resource",
          description: "There was an error deleting the resource. Please try again.",
          variant: "destructive",
        });
        console.error("Error deleting document: ", error);
      } finally {
        setResourceToDelete(null);
      }
    }
  };

  if (loading) {
    return <p>Loading resources...</p>;
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead className="hidden md:table-cell">Created At</TableHead>
            <TableHead>
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {resources.map((resource) => (
            <TableRow key={resource.id}>
              <TableCell className="font-medium">{resource.title}</TableCell>
              <TableCell className="hidden md:table-cell">
                {format(resource.createdAt, 'PP')}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button aria-haspopup="true" size="icon" variant="ghost">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => handleEditClick(resource)}>Edit</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-destructive focus:bg-destructive/10 focus:text-destructive"
                      onClick={() => handleDeleteClick(resource)}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      <AlertDialog open={!!resourceToDelete} onOpenChange={() => setResourceToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              resource "{resourceToDelete?.title}" from your database.
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

      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
            <DialogTitle>Edit Resource</DialogTitle>
            <DialogDescription>
                Update the details for the resource "{resourceToEdit?.title}".
            </DialogDescription>
            </DialogHeader>
            <ScrollArea className="max-h-[70vh] p-4">
                <ResourceForm 
                    resourceToEdit={resourceToEdit}
                    onFinished={() => setEditDialogOpen(false)}
                />
            </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
}
