"use client";
import { useEffect, useState } from 'react';
import ArticleCard from '@/components/ArticleCard';
import Footer from '@/components/Footer';
import BackButton from '@/components/BackButton';
import NavigationMenu from '@/components/NavigationMenu';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import TopNav from '@/components/TopNav';
import Pagination from '@/components/Pagination';

interface ArticleData {
  title: string;
  description: string;
  date: string;
  image: string;
  slug: string;
  category: string;
  href: string;
}

export default function ArticlesPage() {
  const [articles, setArticles] = useState<ArticleData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // دریافت مقالات از API
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(
          'https://api.mockfly.dev/mocks/ef8e4ba5-5dc1-4b36-9bca-5f59afb45ebe/article'
        );
        
        if (!response.ok) {
          throw new Error("Error fetching articles");
        }
        
        const data = await response.json();
        if (data && Array.isArray(data)) {
          setArticles(data);
        } else if (data.articles && Array.isArray(data.articles)) {
          setArticles(data.articles);
        } else {
          console.error("Data format is not valid:", data);
        }
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // محاسبه مقالاتی که باید در صفحه جاری نمایش داده شوند
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentArticles = articles.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
      <TopNav />
      <div className="container mx-auto py-12">
        <h1 className="text-2xl text-center mb-8 mt-20 text-[#56464d]">
         مقالات تخصصی برنامه نویسی :
        </h1>
        <div className="flex flex-wrap justify-center gap-6 text-justify">
          {currentArticles.length > 0 ? (
            currentArticles.map((article) => (
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
            <p className="text-center text-gray-600">به روز رسانی ... </p>
          )}
        </div>

        {/* اضافه کردن کامپوننت Pagination */}
        {articles.length > itemsPerPage && (
          <Pagination
            currentPage={currentPage}
            totalItems={articles.length}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
          />
        )}
      </div>
      <BackButton />
      <ScrollToTopButton />
      <NavigationMenu />
      <Footer />
    </>
  );
}