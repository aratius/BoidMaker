import { PureComponent, ReactElement } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from "src/styles/layout/maker/index.module.scss"

import 'swiper/css';

/**
 * ページャー
 */
export default class Pager extends PureComponent {

	public render(): ReactElement {
		// TODO: Swiper

		return(
				<Swiper
					spaceBetween={0}
					wrapperTag="ul"
					className={styles.pager}
					slidesPerView={1}
					width={70}
				>
					<SwiperSlide tag="li">
						<a href="#">edit</a>
					</SwiperSlide>
					<SwiperSlide tag="li">
						<a href="#">preview</a>
					</SwiperSlide>
					<SwiperSlide tag="li">
						<a href="#">upload</a>
					</SwiperSlide>
				</Swiper>
		);
	}

}