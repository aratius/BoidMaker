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
	private _elements: (HTMLAnchorElement | null)[] = []

	/**
	 * スワイパーインスタンスののref
	 * @param node
	 * @returns
	 */
	private _onSwiper = (node: Swiper): void => {
		if(!node) return
		this._swiper = node
		this._applyAlpha()
	}

	/**
	 * slide時
	 * @param swiper
	 */
	private _onSlide = (swiper: Swiper): void => {
		this.props.onChangeMode(swiper.activeIndex)
		this._applyAlpha()
	}

	/**
	 * 透明度を適用
	 */
	private _applyAlpha(): void {
		this._elements.forEach((el, i) => {
			if(!el) return
			if(i == this._swiper?.activeIndex) el.style.opacity = "1"
			else el.style.opacity = "0.2"
		})
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
							ref={node => this._elements[INDEX_EDIT] = node}
						>edit</a>
					</SwiperSlide>
					<SwiperSlide tag="li">
						<a
							href="#"
							onClick={() => this._swiper?.slideTo(INDEX_PREVIW)}
							ref={node => this._elements[INDEX_PREVIW] = node}
						>preview</a>
					</SwiperSlide>
					<SwiperSlide tag="li">
						<a
							href="#"
							onClick={() => this._swiper?.slideTo(INDEX_UPLOAD)}
							ref={node => this._elements[INDEX_UPLOAD] = node}
						>upload</a>
					</SwiperSlide>
				</SwiperReact>
		);
	}

}