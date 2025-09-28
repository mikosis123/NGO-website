import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { NewsArticle } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';

type ArticleCardProps = {
  article: NewsArticle;
};

export default function ArticleCard({ article }: ArticleCardProps) {
  const formattedDate = format(new Date(article.date), 'MMMM d, yyyy');

  return (
    <Card className="overflow-hidden transition-all hover:shadow-xl group md:flex">
        <div className="md:w-1/3 relative h-64 md:h-auto">
            <Image
                src={article.imageUrl}
                alt={article.title}
                fill
                className="object-cover"
                data-ai-hint={article.imageHint}
            />
        </div>
      <div className="md:w-2/3 flex flex-col">
        <CardHeader>
            <p className="text-sm text-muted-foreground">{formattedDate}</p>
            <CardTitle className="font-headline text-2xl mt-1">{article.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
          <CardDescription className="text-base">{article.excerpt}</CardDescription>
        </CardContent>
        <CardFooter>
          <Button asChild variant="link" className="p-0 h-auto text-primary">
            <Link href={`/news/${article.slug}`}>
              Read Full Story <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}
