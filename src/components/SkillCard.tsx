import React from 'react';
import Image from 'next/image';

interface SkillCardProps {
  title: string;
  description: string;
  imgSrc: string;
  proficiency: string;
}

const SkillCard: React.FC<SkillCardProps> = ({ title, description, imgSrc, proficiency }) => {
  return (
    <div className="w-full sm:w-1/2 md:w-1/3 p-4"> {/* عرض کارت در حالت ریسپانسیو */}
      <div className="bg-white  p-4 text-right text-[#56544d] hover:bg-gradient-to-b from-white to-[#56464d] hover:text-white rounded-lg drop-shadow-lg shadow-[#56464d] border-t-8 border-[#56464d]">
        <div className="icon-wrapper mb-4">
          <Image src={imgSrc} alt={title} width={50} height={50} className="mx-auto rounded-lg" />
        </div>
        <h3 className="font-bold text-lg mb-2">{title}</h3>
        <p className="mb-2">{description}</p>
        <span className="block text-right text-sm mb-2">میزان تسلط من:</span>
        <div className="relative w-full bg-gray-200 rounded h-4">
          <div className="absolute h-4 bg-[#ffe082] rounded" style={{ width: proficiency }}>
            <span className="text-[#56464d] text-xs absolute right-2">{proficiency}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillCard;