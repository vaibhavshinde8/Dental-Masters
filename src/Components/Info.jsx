import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Info = () => {
  return (
    <div className="bg-blue-100 px-10 py-10 lg:py-0 lg:mt-10">
      <div className="lg:px-12 lg:grid lg:grid-cols-2 space-y-10 lg:space-y-0">
        {/* Swiper Carousel for Mobile */}
        <div className="lg:hidden">

          
          <h1 className="text-xl font-semibold text-center text-blue-500">Your Dream Smile</h1>
          <h1 className="text-2xl font-semibold text-center text-blue-950 pb-6 w-full">Advanced Technology</h1>
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={10}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            className="mySwiper"
          >
            <SwiperSlide>
              <div className="flex flex-col text-gray-800 justify-center">
                <img
                  src="/Group 16.png"
                  alt="Zoom Teeth Whitening"
                  className="w-full h-72 object-cover"
                />
                <p className="pt-3 text-xl font-semibold text-center">
                  Zoom Teeth Whitening
                </p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="flex flex-col text-center justify-center">
                <img
                  src="/1339044 1.png"
                  className="p-3 bg-white lg:mt-[22px] rounded-3xl shadow-lg w-full h-72 object-cover"
                  alt="Intra Oral Camera"
                />
                <p className="w-full text-gray-800 text-xl font-semibold pt-3">
                  Intra Oral Camera
                </p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="flex flex-col justify-center">
                <img
                  src="/1339067 1.png"
                  alt="Peizon Surgery"
                  className="w-full h-72  object-cover bg-blue-800 p-6 rounded-full"
                />
                <p className="pl-4 pt-3 text-center text-xl font-semibold text-gray-800">
                  Peizon Surgery
                </p>
              </div>
            </SwiperSlide>
          </Swiper>
          <p className="text-gray-900 text-center pt-6">
            At Dental Masters we are passionate about providing you the best
            treatment using the latest dental technology available.
          </p>
          <p className="text-gray-900 text-center pt-6">
            Advanced tools and technologies make a big difference in your dental
            treatment
          </p>
        </div>
        {/* Swiper Carousel for Desktop */}
        <div className="hidden lg:grid grid-cols-3 gap-6 items-center px-10">
          {/* Image 1 */}
          <div>
            <img
              src="/Group 16.png"
              className="p-3 rounded-lg"
              alt="Zoom Teeth Whitening"
            />
            <p className="text-center text-gray-800">Zoom Teeth Whitening</p>
          </div>

          {/* Image 2 */}
          <div className="bg-white mt-[20px] ml-[8px] relative bottom-5 rounded-full flex flex-col items-center justify-center h-32 w-32 p-4 shadow-lg">
            <img
              src="/1339044 1.png"
              className="h-28 w-28 p-4 relative top-3 object-contain"
              alt="Intra Oral Camera"
            />
            <p className="relative top-10 w-[114px] text-center text-gray-800">Intra oral camera</p>
          </div>

          {/* Image 3 */}
          <div>
            <img
              src="/1339067 1.png"
              className="bg-blue-800 p-7 mt-[8px] w-32 h-32 rounded-full shadow-lg"
              alt="Peizon Surgery"
            />
            <p className="relative top-2 text-center text-gray-800 right-3">Peizon Suregry</p>
          </div>
        </div>

        <div className="hidden lg:block px-10 mt-6 py-10">
          <h1 className="text-2xl font-bold text-blue-500 mb-4">
            Your Dream Smile
          </h1>
          <h2 className="text-3xl font-semibold text-blue-900 mb-6">
            Advanced Technology
          </h2>
          <p className="text-base text-gray-900 leading-relaxed mb-4">
            At Dental Masters, we are passionate about providing you the best
            treatment using the latest dental technology available.
          </p>
          <p className="text-base text-gray-900 leading-relaxed">
            Advanced tools and technologies make a big difference in your dental
            treatment.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Info;
