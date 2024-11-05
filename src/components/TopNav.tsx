"use client"

import { useState } from 'react';
import Link from 'next/link';

const TopNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed top-0 w-full bg-[#ffe082] z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className=" bg-[#56464d] text-white p-2 rounded focus:outline-none"
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

          <div className="hidden md:flex flex-1 justify-start items-center flex-row-reverse text-right space-x-4 rtl:space-x-reverse">
            <Link href="https://sunflower-dev.com" className="text-[#56464d] px-3 py-2 text-lg font-medium hover:bg-[#56464d] hover:text-white h-full rounded-lg">
              صفحه اصلی
            </Link>
            <Link href="https://sunflower-dev.com/#about" className="text-[#56464d] px-3 py-2 text-lg font-medium hover:bg-[#56464d] hover:text-white h-full rounded-lg">
              درباره من
            </Link>
            <Link href="https://sunflower-dev.com/#skill" className="text-[#56464d] px-3 py-2 text-lg font-medium hover:bg-[#56464d] hover:text-white h-full rounded-lg">
              مهارتهای من
            </Link>
            <Link href="#contact" className="text-[#56464d] px-3 py-2 text-lg font-medium hover:bg-[#56464d] hover:text-white h-full rounded-lg">
              ارتباط با من
            </Link>
            <Link href="https://sunflower-dev.com/article" className="text-[#56464d] px-3 py-2 text-lg font-medium hover:bg-[#56464d] hover:text-white h-full rounded-lg">
              مقالات من
            </Link>
          </div>
        </div>
      </div>

  
      {isOpen && (
        <div className="md:hidden bg-[#ffe082] text-right"> 
          <Link href="https://sunflower-dev.com" className="block text-[#56464d] px-3 py-2 text-lg font-medium hover:bg-[#56464d] hover:text-white">
            صفحه اصلی
          </Link>
          <Link href="https://sunflower-dev.com/#about" className="block text-[#56464d] px-3 py-2 text-lg font-medium hover:bg-[#56464d] hover:text-white">
            درباره من
          </Link>
          <Link href="https://sunflower-dev.com/#skill" className="block text-[#56464d] px-3 py-2 text-lg font-medium hover:bg-[#56464d] hover:text-white">
            مهارتهای من
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