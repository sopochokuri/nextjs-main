import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";

const AutoSwiper = ({ images, width, height }) => {
	return (
		<Swiper
			modules={[Autoplay]}
			spaceBetween={50}
			slidesPerView={1}
			autoplay={{
				delay: 3000, // 3 seconds delay
				disableOnInteraction: false, // Keeps autoplay active after user interaction
			}}
			loop={true} // Infinite loop
		>
			{images?.map((image, index) => {
				return (
					<SwiperSlide key={index}>
						<img
							src={`https://digital-cms.ge/${image.file_name}`}
							alt={index}
							width="120px"
							height="auto"
						/>
					</SwiperSlide>
				);
			})}
		</Swiper>
	);
};

export default AutoSwiper;
