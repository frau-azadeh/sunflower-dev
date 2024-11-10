"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Article {
  slug: string;
  category: string;
  title: string;
}

const TopNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [allArticles, setAllArticles] = useState<Article[]>([]);
  const [searchResults, setSearchResults] = useState<Article[]>([]);
  const [noResults, setNoResults] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // دریافت تمام مقالات در ابتدای بارگذاری کامپوننت
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(`https://api.mockfly.dev/mocks/ef8e4ba5-5dc1-4b36-9bca-5f59afb45ebe/article`);
        
        if (!response.ok) {
          throw new Error("خطا در درخواست به API");
        }
        
        const data = await response.json();
        console.log("ساختار داده‌های دریافتی از API:", data);

        // بررسی اینکه آیا داده‌ها به صورت آرایه هستند
        if (Array.isArray(data)) {
          setAllArticles(data); // تنظیم مقالات به عنوان آرایه دریافتی
        } else if (data && Array.isArray(data.articles)) {
          // اگر مقالات داخل شیء data هستند
          setAllArticles(data.articles);
        } else {
          console.error("داده‌های دریافتی از API به صورت آرایه یا در قالب صحیح نیستند:", data);
          setAllArticles([]);
        }
      } catch (error) {
        console.error("خطا در دریافت مقالات:", error);
      }
    };

    fetchArticles();
  }, []);

  // فیلتر کردن مقالات بر اساس کلمه جستجو
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);

    if (term.length > 2) {
      const filteredResults = allArticles.filter(article =>
        article.title.toLowerCase().includes(term.toLowerCase())
      );
      setSearchResults(filteredResults);
      setNoResults(filteredResults.length === 0);
    } else {
      setSearchResults([]);
      setNoResults(false);
    }
  };

  return (
    <nav className="fixed top-0 w-full bg-[#ffe082] z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* لینک‌های ناوبری سمت چپ، فقط در حالت دسکتاپ */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="https://sunflower-dev.com" className="text-[#56464d] px-3 py-2 text-lg font-medium hover:bg-[#56464d] hover:text-white h-full rounded-lg">
              صفحه اصلی
            </Link>
            <Link href="https://sunflower-dev.com/#about" className="text-[#56464d] px-3 py-2 text-lg font-medium hover:bg-[#56464d] hover:text-white h-full rounded-lg">
              درباره من
            </Link>
            <Link href="https://sunflower-dev.com/#skill" className="text-[#56464d] px-3 py-2 text-lg font-medium hover:bg-[#56464d] hover:text-white h-full rounded-lg">
              مهارت‌های من
            </Link>
            <Link href="#contact" className="text-[#56464d] px-3 py-2 text-lg font-medium hover:bg-[#56464d] hover:text-white h-full rounded-lg">
              ارتباط با من
            </Link>
            <Link href="https://sunflower-dev.com/article" className="text-[#56464d] px-3 py-2 text-lg font-medium hover:bg-[#56464d] hover:text-white h-full rounded-lg">
              مقالات من
            </Link>
          </div>

          {/* باکس جستجو سمت راست */}
          <div className="relative flex-1 max-w-xs ml-4">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="جستجو..."
              className="w-full px-3 py-2 rounded-lg text-[#56464d] bg-white focus:outline-none"
            />
            <div className="absolute right-0 w-full bg-white shadow-lg rounded-lg mt-2 z-50">
              {searchResults.length > 0 ? (
                searchResults.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/blog/${article.category}/${article.slug}`}
                    className="block px-4 py-2 text-[#56464d] hover:bg-blue-50 hover:rounded-lg"
                  >
                    {article.title}
                  </Link>
                ))
              ) : (
                noResults && (
                  <div className="px-4 py-2 text-[#56464d]">
                    مقاله‌ای پیدا نشد.
                  </div>
                )
              )}
            </div>
          </div>

          {/* دکمه منو برای حالت موبایل */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="bg-[#56464d] text-white p-2 rounded focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* نمایش منوی موبایل بدون جستجو */}
      {isOpen && (
        <div className="md:hidden bg-[#ffe082] text-right px-4 py-2">
          <Link href="https://sunflower-dev.com" className="block text-[#56464d] px-3 py-2 text-lg font-medium hover:bg-[#56464d] hover:text-white">
            صفحه اصلی
          </Link>
          <Link href="https://sunflower-dev.com/#about" className="block text-[#56464d] px-3 py-2 text-lg font-medium hover:bg-[#56464d] hover:text-white">
            درباره من
          </Link>
          <Link href="https://sunflower-dev.com/#skill" className="block text-[#56464d] px-3 py-2 text-lg font-medium hover:bg-[#56464d] hover:text-white">
            مهارت‌های من
          </Link>
          <Link href="#contact" className="block text-[#56464d] px-3 py-2 text-lg font-medium hover:bg-[#56464d] hover:text-white">
            ارتباط با من
          </Link>
          <Link href="https://sunflower-dev.com/article" className="block text-[#56464d] px-3 py-2 text-lg font-medium hover:bg-[#56464d] hover:text-white">
            مقالات من
          </Link>
        </div>
      )}
    </nav>
  );
};

export default TopNav;