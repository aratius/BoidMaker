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

	/**
	 * slide時
	 * @param swiper
	 */
	private _onSlide = (swiper: Swiper): void => {
		const current = this._swiper?.activeIndex
		this.props.onChangeMode(current || 0)
	}

	public render(): ReactElement {
		// TODO: Swiper

		return(
				<SwiperReact
					spaceBetween={0}
					wrapperTag="ul"
					className={styles.pager}
					slidesPerView={1}
					width={70}
					onSwiper={node => this._swiper = node}
					onSlideChange={this._onSlide}
				>
					<SwiperSlide tag="li">
						<a href="#" onClick={() => this._swiper?.slideTo(0)}>edit</a>
					</SwiperSlide>
					<SwiperSlide tag="li">
						<a href="#" onClick={() => this._swiper?.slideTo(1)}>preview</a>
					</SwiperSlide>
					<SwiperSlide tag="li">
						<a href="#" onClick={() => this._swiper?.slideTo(2)}>upload</a>
					</SwiperSlide>
				</SwiperReact>
		);
	}

}