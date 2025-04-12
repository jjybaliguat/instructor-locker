import MainHeroCarousel from '@/components/homepage-layout/MainHeroCarosel'
import React from 'react'

const images = [
    '/slider-images/1.png',
    '/slider-images/2.png',
    '/slider-images/3.png'
  ];
  const heroSliderTexts = [
    {
      title: "Adaptable Education for Busy Lifestyle",
      subtitle: "Our online platform offers flexibility, allowing you to balance your education with your busy schedule.",
      moreActionLink: "/"
    },
    {
      title: "Education is The Best key Success in Life.",
      subtitle: "Through a combination of lectures, readings, and discussions, students will gain a solid foundation in educational psychology.",
      moreActionLink: "/"
    },
    {
      title: "Unlock Your Potential with Lifelong Learning",
      subtitle: "Our diverce courses cater to varoius interests, helping you pursue your passion and enhance your knowledge.",
      moreActionLink: "/"
    },
  ]

const HomePage = () => {
  return (
    <>
        <MainHeroCarousel images={images} sliderTexts={heroSliderTexts} />
    </>
  )
}

export default HomePage