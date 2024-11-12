import { Metadata } from "next";
import ArticleClient from "@/components/ArticleClient";
import TopNav from "@/components/TopNav";
import Footer from "@/components/Footer";
import BackButton from "@/components/BackButton";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import NavigationMenu from "@/components/NavigationMenu";
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

// تابع برای دریافت داده‌های مقاله
async function fetchArticles(): Promise<ArticleData[]> {
  const response = await fetch(
    "https://api.mockfly.dev/mocks/ef8e4ba5-5dc1-4b36-9bca-5f59afb45ebe/article",
    { cache: "no-store" }
  );
  const data = await response.json();
  return Array.isArray(data.articles) ? data.articles : [];
}

// تابع برای تنظیم SEO و متا تگ‌ها
export async function generateMetadata({
  params,
}: {
  params: { category: string; slug: string };
}): Promise<Metadata> {
  const articles = await fetchArticles();
  const article = articles.find(
    (a) =>
      a.category.toLowerCase() === params.category.toLowerCase() &&
      a.slug === params.slug
  );

  return {
    title: article ? `${article.title} - وبلاگ` : "مقاله - وبلاگ",
    description: article
      ? article.description
      : "مقاله‌ای درباره برنامه‌نویسی و توسعه وب.",
    openGraph: {
      title: article ? `${article.title} - وبلاگ` : "مقاله - وبلاگ",
      description: article
        ? article.description
        : "مقاله‌ای درباره برنامه‌نویسی و توسعه وب.",
      url: `https://sunflower-dev.com/blog/${params.category}/${params.slug}`,
      siteName: "وبلاگ برنامه نویسی",
      images: [
        {
          url: article ? article.image : "/default-image.jpg",
          width: 1200,
          height: 630,
          alt: article ? article.title : "مقاله",
        },
      ],
      locale: "fa_IR",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: article ? `${article.title} - وبلاگ` : "مقاله - وبلاگ",
      description: article
        ? article.description
        : "مقاله‌ای درباره برنامه‌نویسی و توسعه وب.",
      images: [article ? article.image : "/default-image.jpg"],
    },
  };
}

// صفحه اصلی مقاله
export default async function ArticlePage({
  params,
}: {
  params: { category: string; slug: string };
}) {
  const articles = await fetchArticles();
  const article = articles.find(
    (a) =>
      a.category.toLowerCase() === params.category.toLowerCase() &&
      a.slug === params.slug
  );

  return (
    <>
      <TopNav />
      <div className="container mx-auto py-12">
        <ArticleClient article={article|| null} articles={articles} />
      </div>
      <BackButton />
      <ScrollToTopButton />
      <NavigationMenu />
      <Footer />
    </>
  );
}