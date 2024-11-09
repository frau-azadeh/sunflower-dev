import { FC } from 'react';
import Image from 'next/image';

interface ArticleLayoutProps {
  title: string;
  description: string;
  date: string;
  author: string;
  readingTime: string;
  image: string;
  category: string;
  content: { section_title: string; paragraphs: string[] }[];
}

const ArticleLayout: FC<ArticleLayoutProps> = ({
  title,
  description,
  date,
  author,
  readingTime,
  image,
  category,
  content,
}) => {
  return (
    <div className="bg-[#fff8e1] font-vazir min-h-screen">
      <div className="max-w-4xl mx-auto py-6 grid gap-8">
        {/* Poster Section */}
        <div className="relative w-4/5 mx-auto rounded-lg overflow-hidden shadow-md">
          <Image src={image} alt={title} width={700} height={350} className="w-full h-[350px] object-cover" />
          <div className="absolute bottom-10 right-10 w-2/5 bg-white/20 rounded-lg backdrop-blur-md p-4 border border-white/30 shadow-lg">
            <h1 className="text-4xl text-[#ffe082] font-light mb-2">{title}</h1>
            <div className="w-full h-px bg-[#ffe082]"></div>
            <p className="mt-4 text-[#ffe082] text-lg leading-7">{description}</p>
          </div>
        </div>

        {/* Info Section */}
        <div className="grid grid-cols-4 gap-4 border border-gray-300 rounded-lg bg-white p-5 shadow-sm">
          <div className="text-center text-gray-700">
            <div className="text-sm font-bold font-vazir">منتشر شده در تاریخ:</div>
            <span className="text-sm font-light">{date}</span>
          </div>
          <div className="text-center text-gray-700">
            <div className="text-sm font-bold">نویسنده:</div>
            <span className="text-sm font-light">{author}</span>
          </div>
          <div className="text-center text-gray-700">
            <div className="text-sm font-bold">دسته بندی:</div>
            <span className="text-sm font-light">{category}</span>
          </div>
          <div className="text-center text-gray-700">
            <div className="text-sm font-bold">مدت زمان خواندن:</div>
            <span className="text-sm font-light">{readingTime}</span>
          </div>
        </div>

        {/* Content Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          {content.map((section, index) => (
            <section key={index} className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">{section.section_title}</h2>
              {section.paragraphs.map((paragraph, pIndex) => (
                <p key={pIndex} className="text-gray-700 text-justify leading-7 mb-4">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArticleLayout;
