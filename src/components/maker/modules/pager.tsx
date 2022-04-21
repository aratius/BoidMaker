import { PureComponent, ReactElement } from "react";
import Swiper from "swiper";
import { Swiper as SwiperReact, SwiperSlide } from 'swiper/react';
import styles from "src/styles/layout/maker/index.module.scss"

import 'swiper/css';

interface Props {
	onChangeMode: (modeIndex: number) => void;
}

/**
 * ページャー
 */
export default class Pager extends PureComponent<Props> {

	private _swiper: Swiper | null = null

	private _onSwiper = (node: Swiper): void => {
		if(!node) return
		this._swiper = node
	}

	/**
	 * slide時
	 * @param swiper
	 */
	private _onSlide = (swiper: Swiper): void => {
		this.props.onChangeMode(swiper.activeIndex)
	}

	public render(): ReactElement {
		// TODO: Swiper
		const INDEX_EDIT = 0
		const INDEX_PREVIW = 1
		const INDEX_UPLOAD = 2

		return(
				<SwiperReact
					spaceBetween={0}
					wrapperTag="ul"
					className={styles.pager}
					slidesPerView={1}
					width={70}
					onSwiper={this._onSwiper}
					onSlideChange={this._onSlide}
				>
					<SwiperSlide tag="li">
						<a
							href="#"
							onClick={() => this._swiper?.slideTo(INDEX_EDIT)}
						>edit</a>
					</SwiperSlide>
					<SwiperSlide tag="li">
						<a
							href="#"
							onClick={() => this._swiper?.slideTo(INDEX_PREVIW)}
						>preview</a>
					</SwiperSlide>
					<SwiperSlide tag="li">
						<a
							href="#"
							onClick={() => this._swiper?.slideTo(INDEX_UPLOAD)}
						>upload</a>
					</SwiperSlide>
				</SwiperReact>
		);
	}

}