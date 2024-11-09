"use client"
import { useEffect, useState } from 'react';
import ArticleCard from '@/components/ArticleCard';
import Footer from '@/components/Footer';
import BackButton from '@/components/BackButton';
import NavigationMenu from '@/components/NavigationMenu';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import TopNav from '@/components/TopNav';

interface ArticleData {
  title: string;
  description: string;
  date: string;
  image: string;
  slug: string;
  category: string;
}

export default function ArticlesPage() {
  const [articles, setArticles] = useState<ArticleData[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('https://api.mockfly.dev/mocks/ef8e4ba5-5dc1-4b36-9bca-5f59afb45ebe/article');
        const data = await response.json();
        setArticles(data.articles);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <>
    <TopNav/>
    <div className="container mx-auto py-12  pt-30">
      <h1 className="text-2xl font-semibold text-center  mb-8  mt-20 text-[#56464d]">مقالات تخصصی برنامه نویسی:</h1>
      <div className="sliderespans flex flex-wrap justify-center gap-6 text-[#56464d] text-justify">
        {articles.map((article) => (
          <ArticleCard
            key={article.slug}
            title={article.title}
            description={article.description}
            date={article.date}
            image={article.image}
            href={`/blog/${article.category}/${article.slug}`}
          />
        ))}
      </div>
    </div>
    <BackButton/>
    <ScrollToTopButton/>
    <NavigationMenu/>
    <Footer/>
    </>
    
  );
}