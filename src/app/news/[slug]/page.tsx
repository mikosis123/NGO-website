
import { mockNews } from '@/lib/mock-data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { format } from 'date-fns';
import { Calendar, User } from 'lucide-react';

type NewsPageProps = {
  params: {
    slug: string;
  };
};

export default function NewsArticlePage({ params }: NewsPageProps) {
  const article = mockNews.find(p => p.slug === params.slug);

  if (!article) {
    notFound();
  }

  const formattedDate = format(new Date(article.date), 'MMMM d, yyyy');

  return (
    <div className="container mx-auto px-4 py-12 md:py-20 pt-32 md:pt-32">
      <div className="max-w-3xl mx-auto">
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
