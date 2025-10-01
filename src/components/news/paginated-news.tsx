
'use client';

import { useEffect, useState } from 'react';
import ArticleCard from '@/components/news/article-card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { NewsArticle } from '@/lib/types';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Skeleton } from '../ui/skeleton';

const NEWS_PER_PAGE = 4;

function ArticleCardSkeleton() {
    return (
        <div className="flex flex-col md:flex-row overflow-hidden border rounded-lg">
            <Skeleton className="md:w-1/3 h-64 md:h-auto" />
            <div className="md:w-2/3 p-6 flex flex-col">
                <Skeleton className="h-4 w-1/4 mb-4" />
                <Skeleton className="h-6 w-3/4 mb-2" />
                <div className="flex-grow mt-4 space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                </div>
                <Skeleton className="h-5 w-24 mt-4" />
            </div>
        </div>
    )
}

export default function PaginatedNews() {
  const [currentPage, setCurrentPage] = useState(1);
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const q = query(collection(db, 'news'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const articlesData: NewsArticle[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          articlesData.push({
            id: doc.id,
            ...data,
            createdAt: data.createdAt.toDate(),
          } as NewsArticle);
        });
        setArticles(articlesData);
      } catch (error) {
        console.error("Error fetching news articles:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  const totalPages = Math.ceil(articles.length / NEWS_PER_PAGE);
  const startIndex = (currentPage - 1) * NEWS_PER_PAGE;
  const currentNews = articles.slice(startIndex, startIndex + NEWS_PER_PAGE);

  const goToNextPage = () => {
    setCurrentPage((page) => Math.min(page + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setCurrentPage((page) => Math.max(page - 1, 1));
  };

  return (
    <div>
      <div className="mt-12 max-w-4xl mx-auto space-y-12">
        {loading ? (
            [...Array(NEWS_PER_PAGE)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.2 }}
                >
                    <ArticleCardSkeleton />
                </motion.div>
            ))
        ) : (
            currentNews.map((article, i) => (
            <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
            >
                <ArticleCard article={article} />
            </motion.div>
            ))
        )}
      </div>

      {!loading && totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-12">
            <Button
            variant="outline"
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            >
            <ArrowLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            <span className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
            </span>
            <Button
            variant="outline"
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            >
            Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
        </div>
      )}
    </div>
  );
}
