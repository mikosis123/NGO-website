
'use client';

import { notFound, useParams } from 'next/navigation';
import Image from 'next/image';
import { format } from 'date-fns';
import { Calendar } from 'lucide-react';
import BackButton from '@/components/back-button';
import { useEffect, useState } from 'react';
import { NewsArticle } from '@/lib/types';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Skeleton } from '@/components/ui/skeleton';

export default function NewsArticlePage() {
  const params = useParams();
  const { slug } = params;
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!slug) return;
      try {
        const q = query(collection(db, "news"), where("slug", "==", slug), limit(1));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
          setError('Article not found');
        } else {
          const doc = querySnapshot.docs[0];
          const data = doc.data();
          setArticle({
            id: doc.id,
            ...data,
            createdAt: data.createdAt?.toDate(),
          } as NewsArticle);
        }
      } catch (err) {
        console.error("Error fetching article:", err);
        setError('Failed to load article.');
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);
  
  if (loading) {
    return (
        <div className="container mx-auto px-4 py-12 md:py-20 pt-32 md:pt-32">
            <div className="max-w-3xl mx-auto">
                <Skeleton className="h-10 w-24 mb-8" />
                <Skeleton className="h-12 w-full mb-4" />
                <Skeleton className="h-8 w-3/4 mb-4" />
                <Skeleton className="h-6 w-1/3 mb-8" />
                <Skeleton className="h-[400px] w-full my-8" />
                <Skeleton className="h-6 w-full mb-4" />
                <Skeleton className="h-6 w-full mb-4" />
                <Skeleton className="h-6 w-5/6 mb-4" />
            </div>
        </div>
    );
  }

  if (error) {
     notFound();
  }

  if (!article) {
    return null;
  }

  const formattedDate = format(new Date(article.date), 'MMMM d, yyyy');

  return (
    <div className="container mx-auto px-4 py-12 md:py-20 pt-32 md:pt-32">
      <div className="max-w-3xl mx-auto">
        <BackButton />
        <article className="prose lg:prose-xl max-w-none">
          <div className="mb-8">
            <h1 className="font-headline !text-4xl md:!text-5xl !leading-tight mb-4">{article.title}</h1>
            <div className="flex items-center text-muted-foreground text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <time dateTime={article.date}>{formattedDate}</time>
              </div>
            </div>
          </div>

          <div className="relative h-[250px] md:h-[400px] w-full my-8 rounded-lg overflow-hidden shadow-lg">
            <Image
              src={article.imageUrl}
              alt={article.title}
              fill
              className="object-cover"
              priority
              data-ai-hint={article.imageHint}
            />
          </div>

          <p className="lead !text-xl !text-foreground/90">{article.excerpt}</p>
          
          <div dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, '<br />') }} />

        </article>
      </div>
    </div>
  );
}
