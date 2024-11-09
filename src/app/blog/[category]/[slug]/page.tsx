"use client"
import ArticleLayout from '@/components/ArticleLayout';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Footer from '@/components/Footer';
import BackButton from '@/components/BackButton';
import NavigationMenu from '@/components/NavigationMenu';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import TopNav from '@/components/TopNav';

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
  const params = useParams();
  const slug = params?.slug as string | undefined;
  const category = params?.category as string | undefined;

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

        setArticles(data.articles); 
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
      const foundArticle = articles.find(
        (article) =>
          article.category.toLowerCase() === category.toLowerCase() &&
          article.slug === slug
      );
      setArticle(foundArticle || null);
    }
  }, [category, slug, articles]);

  if (loading) {
    return <div>در حال بارگذاری...</div>;
  }

  if (!article) {
    return <div>...</div>;
  }

  return (
    <>
      <TopNav />
      <ArticleLayout  
        title={article.title}
        description={article.description}
        date={article.date}
        author={article.author}
        readingTime={article.reading_time}
        image={article.image}
        category={article.category}
        content={article.content}
      />
     <BackButton/>
    <ScrollToTopButton/>
    <NavigationMenu/>
    <Footer/>
    </>
  );
}