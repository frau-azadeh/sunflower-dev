import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ArticleLayout from '@/components/ArticleLayout';

interface ArticleData {
  title: string;
  description: string;
  date: string;
  author: string;
  reading_time: string;
  image: string;
  content: { section_title: string; paragraphs: string[] }[];
  category: string;
  slug: string;
}

export default function ArticlePage() {
  const router = useRouter();
  const { category, slug } = router.query;

  const [articles, setArticles] = useState<ArticleData[]>([]);
  const [article, setArticle] = useState<ArticleData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        // دریافت تمام مقالات از API
        const response = await fetch(
          'https://api.mockfly.dev/mocks/ef8e4ba5-5dc1-4b36-9bca-5f59afb45ebe/article'
        );
        const data = await response.json();

        setArticles(data.articles); // فرض کنید JSON دارای آرایه‌ای از مقالات به نام "articles" باشد
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  useEffect(() => {
    if (category && slug && articles.length > 0) {
      // فیلتر کردن مقاله مورد نظر بر اساس category و slug
      const foundArticle = articles.find(
        (article) =>
          article.category.toLowerCase() === category.toString().toLowerCase() &&
          article.slug === slug
      );
      setArticle(foundArticle || null);
    }
  }, [category, slug, articles]);

  if (loading) {
    return <div>در حال بارگذاری...</div>;
  }

  if (!article) {
    return <div>مقاله یافت نشد.</div>;
  }

  return (
    <ArticleLayout
      title={article.title}
      description={article.description}
      date={article.date}
      author={article.author}
      readingTime={article.reading_time}
      image={article.image}
      content={article.content}
    />
  );
}
