// app/articles/[category]/page.tsx
"use client"
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
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

export default function CategoryPage() {
  const { category } = useParams();
  const [articles, setArticles] = useState<ArticleData[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<ArticleData[]>([]);

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

  useEffect(() => {
    // تبدیل category به رشته در صورتی که آرایه باشد
    const categoryString = Array.isArray(category) ? category[0] : category;

    if (categoryString && articles.length > 0) {
      const filtered = articles.filter(
        (article) => article.category.toLowerCase() === categoryString.toLowerCase()
      );
      setFilteredArticles(filtered);
    }
  }, [category, articles]);

  return (
    <>
     <TopNav/>    
    <div className="container mx-auto py-12 ">
      <h1 className="text-2xl text-center mb-8  mt-20 text-[#56464d]">مقالات دسته‌بندی: {category}</h1>
      <div className="flex flex-wrap justify-center gap-6 text-justify">
        {filteredArticles.length > 0 ? (
          filteredArticles.map((article) => (
            <ArticleCard
              key={article.slug}
              title={article.title}
              description={article.description}
              date={article.date}
              image={article.image}
              href={`/blog/${article.category}/${article.slug}`}
            />
          ))
        ) : (
          <p className="text-center text-gray-600">...</p>
        )}
      </div>
    </div>
    <BackButton/>
    <ScrollToTopButton/>
    <NavigationMenu/>
    <Footer/>
    </>
   
  );
}