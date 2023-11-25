import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import video1 from "../../../assets/video/vid1.mp4";
import video2 from "../../../assets/video/vid2.mp4";
import video3 from "../../../assets/video/vid3.mp4";
import video4 from "../../../assets/video/vid4.mp4";

const BannerSection = () => {
  return (
    <div>
      <div>
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 7500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className="relative lg:h-[650px] ">
              <div className="w-full h-0 relative pb-[56.250%]">
                <video
                  src={video1}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full lg:h-[75%] absolute object-cover"
                ></video>
              </div>
              <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white z-10">
                <h1 className="lg:text-5xl font-bold mb-5 text-[#00ffcc]">
                  Welcome To HRMS Solution
                </h1>
                <p className="lg:text-3xl font-semibold text-[#00cc66] mb-5">
                  Streamlining HR Processes for Optimal Organizational.
                  Performance Navigating Success with Integrated Human Resource
                  Solutions.
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative lg:h-[650px] ">
              <div className="w-full h-0 relative pb-[56.250%]">
                <video
                  src={video2}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full lg:h-[75%] absolute object-cover"
                ></video>
              </div>
              <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white z-10">
                <h1 className="lg:text-5xl font-bold mb-5 text-[#00ffcc]">
                  Welcome To HRMS Solution
                </h1>
                <p className="lg:text-3xl font-semibold text-[#00cc66] mb-5">
                  Streamlining HR Processes for Optimal Organizational
                  Performance Empowering Your Team, Optimizing Your
                  Organization.
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative lg:h-[650px] ">
              <div className="w-full h-0 relative pb-[56.250%]">
                <video
                  src={video3}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full lg:h-[75%] absolute object-cover"
                ></video>
              </div>
              <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white z-10">
                <h1 className="lg:text-5xl font-bold mb-5 text-[#00ffcc]">
                  Welcome To HRMS Solution
                </h1>
                <p className="lg:text-3xl font-semibold text-[#00cc66] mb-5">
                  Streamlining HR Processes for Optimal Organizational Elevating
                  HR Efficiency for a Dynamic Workforce
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative lg:h-[650px] ">
              <div className="w-full h-0 relative pb-[56.250%]">
                <video
                  src={video4}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full lg:h-[75%] absolute object-cover"
                ></video>
              </div>
              <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white z-10">
                <h1 className="lg:text-5xl font-bold mb-5 text-[#00ffcc]">
                  Welcome To HRMS Solution
                </h1>
                <p className="lg:text-3xl font-semibold text-[#00cc66] mb-5">
                  Streamlining HR Processes for Optimal Organizational
                  Unleashing the Power of Seamless Human Resource Management
                </p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default BannerSection;
