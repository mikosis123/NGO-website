
'use client';

import { useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { NewsArticle } from '@/lib/types';
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
import { NewsForm } from './news-form';


export function NewsTable() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [articleToDelete, setArticleToDelete] = useState<NewsArticle | null>(null);
  const [articleToEdit, setArticleToEdit] = useState<NewsArticle | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'news'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const articlesData: NewsArticle[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        articlesData.push({
          id: doc.id,
          title: data.title,
          excerpt: data.excerpt,
          content: data.content,
          imageUrl: data.imageUrl,
          imageHint: data.imageHint,
          slug: data.slug,
          date: data.date,
          createdAt: data.createdAt.toDate(),
        });
      });
      setArticles(articlesData);
      setLoading(false);
    }, (error) => {
        console.error("Error fetching articles: ", error);
        setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleDeleteClick = (article: NewsArticle) => {
    setArticleToDelete(article);
  };

  const handleEditClick = (article: NewsArticle) => {
    setArticleToEdit(article);
  }

  const handleConfirmDelete = async () => {
    if (articleToDelete) {
      try {
        await deleteDoc(doc(db, "news", articleToDelete.id));
        toast({
          title: "Article Deleted",
          description: `The article "${articleToDelete.title}" has been successfully deleted.`,
        });
      } catch (error) {
        toast({
          title: "Error Deleting Article",
          description: "There was an error deleting the article. Please try again.",
          variant: "destructive",
        });
        console.error("Error deleting document: ", error);
      } finally {
        setArticleToDelete(null);
      }
    }
  };

  if (loading) {
    return <p>Loading articles...</p>;
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead className="hidden md:table-cell">Published</TableHead>
            <TableHead>
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {articles.map((article) => (
            <TableRow key={article.id}>
              <TableCell className="font-medium">{article.title}</TableCell>
              <TableCell className="hidden md:table-cell">
                {format(new Date(article.date), 'PP')}
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
                    <DropdownMenuItem onClick={() => handleEditClick(article)}>Edit</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-destructive focus:bg-destructive/10 focus:text-destructive"
                      onClick={() => handleDeleteClick(article)}
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
      
      <AlertDialog open={!!articleToDelete} onOpenChange={() => setArticleToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              article "{articleToDelete?.title}" from your database.
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

      <Dialog open={!!articleToEdit} onOpenChange={() => setArticleToEdit(null)}>
        <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
            <DialogTitle>Edit Article</DialogTitle>
            <DialogDescription>
                Update the details for the article "{articleToEdit?.title}".
            </DialogDescription>
            </DialogHeader>
            <ScrollArea className="max-h-[70vh] p-4">
                <NewsForm 
                    articleToEdit={articleToEdit}
                    onFinished={() => setArticleToEdit(null)}
                />
            </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
}
