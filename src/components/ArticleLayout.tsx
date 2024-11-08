import { FC } from 'react';
import Image from 'next/image';
interface ArticleLayoutProps {
  title: string;
  description: string;
  date: string;
  author: string;
  readingTime: string;
  image: string;
  content: { section_title: string; paragraphs: string[] }[];
}

const ArticleLayout: FC<ArticleLayoutProps> = ({
  title,
  description,
  date,
  author,
  readingTime,
  image,
  content,
}) => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Header */}
      <header className="mb-6 text-center">
        <h1 className="text-4xl font-bold text-gray-900">{title}</h1>
        <p className="text-gray-500 mt-2">{description}</p>
        <div className="text-gray-400 mt-2">
          <span>تاریخ: {date}</span> | <span>نویسنده: {author}</span> | <span>زمان خواندن: {readingTime}</span>
        </div>
      </header>

      {/* Image */}
      <div className="mb-6">
        <Image width={100} height={100} src={image} alt={title} className="w-full h-72 object-cover rounded-lg" />
      </div>

      {/* Content */}
      <article className="prose prose-lg max-w-none">
        {Array.isArray(content) ? (
          content.map((section, index) => (
            <section key={index} className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800">{section.section_title}</h2>
              {section.paragraphs.map((paragraph, pIndex) => (
                <p key={pIndex} className="text-gray-700 mt-4 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </section>
          ))
        ) : (
          <p>محتوا موجود نیست یا ساختار آن نادرست است.</p>
        )}
      </article>
    </div>
  );
};

export default ArticleLayout;