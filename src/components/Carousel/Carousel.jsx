import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Container from "../Shared/Container";

const slides = [
  {
    title: "Share Your Life Lessons",
    subtitle: "Inspire others with wisdom from your journey",
    btn: "Start Sharing",
    image: "/images/slide1.jpg",
  },
  {
    title: "Learn from Real Experiences",
    subtitle: "Discover insights from people who have been there",
    btn: "Explore Lessons",
    image: "/images/slide2.jpg",
  },
  {
    title: "Grow Together",
    subtitle: "Join a community of lifelong learners",
    btn: "Join Now",
    image: "/images/slide3.jpg",
  },
];

export default function Carousel() {
  return (
    <div className="w-full h-[calc(100vh-200px)] relative">
      <Swiper
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        navigation
        pagination={{ clickable: true }}
        loop
        speed={1200}
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="w-full h-[calc(100vh-200px)] bg-cover bg-center relative"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40"></div>

              {/* Bottom Blur */}
              <div className="absolute bottom-0 left-0 w-full h-28 bg-gradient-to-t from-white to-transparent"></div>

              {/* Text Content inside Container */}
              <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 text-white">
                <Container>
                  <div className="max-w-xl">
                    <h1 className="text-7xl font-bold mb-3 drop-shadow-lg">
                      {slide.title}
                    </h1>
                    <p className="text-base opacity-90 mb-5 text-xl">
                      {slide.subtitle}
                    </p>

                    <button className="bg-[#F4A031] hover:bg-[#d88928] transition-all px-5 py-2 rounded-md font-semibold">
                      {slide.btn}
                    </button>
                  </div>
                </Container>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
