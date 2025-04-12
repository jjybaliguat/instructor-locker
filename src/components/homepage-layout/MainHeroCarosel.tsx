"use client"
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import React, { useCallback, useEffect, useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

function MainHeroCarousel({images, sliderTexts}:{
  images: string[]; sliderTexts: { title: string; subtitle?: string; moreActionLink?: string }[];
}) {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({delay: 5000, stopOnInteraction: false})])

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    }
  }, [emblaApi]);

    const scrollPrev = useCallback(() => {
      if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi])

    const scrollNext = useCallback(() => {
      if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi])

    const scrollIndex = useCallback((index: number) => {
      if (emblaApi) {
        emblaApi.scrollTo(index);
        setSelectedIndex(index);
      } 
    }, [emblaApi]);
  return (
    <>
      <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {images.map((_, index: any)=>(
            <div key={index} className="hero-slide">
                <Image
                    loading='lazy'
                    src={images[index]}
                    alt="hero img"
                    // width={500}
                    // height={500}
                    fill
                    // quality={100}
                    sizes='width: 100vw'
                    style={{
                      // width: '100%',
                      // height: '(max-height: 75vh), calc(75vh - 15px)',
                      objectFit: "cover",
                      objectPosition: "center"
                    }}
                />
                <div className='absolute z-50 top-[40%] md:left-32 left-20 max-w-[60vw] flex flex-col gap-4'>
                  <h1 className='text-3xl md:text-5xl lg:text-7xl text-white font-bold whitespace-normal'>{sliderTexts[index]?.title}</h1>
                  <h1 className='text-[14px] md:text-[16px] text-neutral-200 font-medium whitespace-normal'>{sliderTexts[index]?.subtitle}</h1>
                </div>
                <div className='absolute bg-black/60 h-full w-full' />
            </div>
          ))}
        </div>
      </div>
      <button className="embla__prev bg-slate-100 md:p-4 p-2 rounded-full" onClick={scrollPrev}>
      <ChevronLeftIcon className="h-5 w-5 text-black" />
      </button>
      <button className="embla__next bg-slate-100 md:p-4 p-1 rounded-full" onClick={scrollNext}>
        <ChevronRightIcon className="h-5 w-5 text-black" />
      </button>
      <div className="embla__dots">
          {images.map((_, index) => { 
            return (
            <button
              key={index}
              onClick={() =>scrollIndex(index)}
              className={`embla__dot${ selectedIndex === index ? ' selected' : ''}`}
            >
            </button>
          )})}
        </div>
    </div>
    </>
  )
}

export default MainHeroCarousel