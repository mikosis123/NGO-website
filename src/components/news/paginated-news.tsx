
'use client';

import { useState } from 'react';
import ArticleCard from '@/components/news/article-card';
import { mockNews } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const NEWS_PER_PAGE = 4;

export default function PaginatedNews() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(mockNews.length / NEWS_PER_PAGE);

  const startIndex = (currentPage - 1) * NEWS_PER_PAGE;
  const currentNews = mockNews.slice(startIndex, startIndex + NEWS_PER_PAGE);

  const goToNextPage = () => {
    setCurrentPage((page) => Math.min(page + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setCurrentPage((page) => Math.max(page - 1, 1));
  };

  return (
    <div>
      <div className="mt-12 max-w-4xl mx-auto space-y-12">
        {currentNews.map((article, i) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.2 }}
          >
            <ArticleCard article={article} />
          </motion.div>
        ))}
      </div>

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
    </div>
  );
}
