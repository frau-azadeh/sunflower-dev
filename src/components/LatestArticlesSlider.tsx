
"use client";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper';
import Link from 'next/link';
import Image from 'next/image';

interface ArticleData {
  title: string;
  description: string;
  date: string;
  image: string;
  slug: string;
  category: string;
}

interface LatestArticlesSliderProps {
  articles: ArticleData[];
}

const LatestArticlesSlider: React.FC<LatestArticlesSliderProps> = ({ articles }) => {
  return (
    <div className="container mx-auto mt-12">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={10}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {articles.map((article) => (
          <SwiperSlide key={article.slug}>
            <div className="post-slide bg-white rounded-lg shadow-lg p-4 mx-2">
              <div className="post-img relative overflow-hidden rounded-lg">
                <Image
                  width={100}
                  height={100}
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover transition-transform duration-200 transform hover:scale-105"
                />
                <div className="over-layer absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-800 opacity-0 hover:opacity-75 transition-opacity duration-500 flex items-center justify-center">
                  <Link className="text-white text-lg font-bold" href={`/blog/${article.category}/${article.slug}`}>
                    ادامه مطلب
                  </Link>
                </div>
              </div>
              <div className="post-content p-4">
                <h3 className="post-title text-lg font-semibold text-gray-800 mb-2">
                  <Link href={`/articles/${article.category}/${article.slug}`}>
                    <a>{article.title}</a>
                  </Link>
                </h3>
                <p className="post-description text-gray-600 text-sm mb-4">
                  {article.description}
                </p>
                <span className="post-date text-gray-400 text-xs">
                  <i className="fa fa-clock-o mr-1"></i>{article.date}
                </span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default LatestArticlesSlider;
