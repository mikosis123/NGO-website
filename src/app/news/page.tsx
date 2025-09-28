import ArticleCard from '@/components/news/article-card';
import { mockNews } from '@/lib/mock-data';

export default function NewsPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">News & Updates</h1>
        <p className="mt-4 text-lg md:text-xl text-muted-foreground">
          Stay informed with the latest stories of impact, project milestones, and announcements from Empower Change.
        </p>
      </div>

      <div className="mt-12 max-w-4xl mx-auto space-y-12">
        {mockNews.map(article => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}
