"use client"
import React, { ReactNode, useEffect, useState } from 'react'

function ScrollNav({children}:{children: ReactNode}) {

    const [isVisible, setIsVisible] = useState(false);

  const controlNavbar = () => {
    if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
  };

  useEffect(() => {
    if(typeof window !== undefined){
        window.addEventListener('scroll', controlNavbar);
        return () => {
        window.removeEventListener('scroll', controlNavbar);
        };
    }
  }, []);

  return (
    <div className={`z-50 fixed top-0 -translate-y-full left-0 w-full transition-transform duration-500 ${isVisible ? 'transform translate-y-0' : 'transform -translate-y-full'}`}>
        {children}
    </div>
  )
}

export default ScrollNav