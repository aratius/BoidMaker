import { Application } from "pixi.js";

/**
 * Makerのエントリーポイント
 */
export default class MakerMain {

	private _app?: Application

	constructor(dom: HTMLElement) {
		this._app = new Application({ width: innerWidth, height: innerHeight })
		dom.appendChild(this._app.view)
		window.addEventListener("resize", this._onResize)
	}

	/**
	 * 初期化
	 */
	public init(): void {

	}

	/**
	 * リサイズ
	 */
	private _onResize(): void {
		this._app?.renderer.resize(innerWidth, innerHeight)
	}

	/**
	 * タッチスタート
	 */
	private _onTouchStart(): void {

	}

	/**
	 * タッチムーブ
	 */
	private _onTouchMove(): void {

	}

	/**
	 * タッチエンド
	 */
	private _onTouchEnd(): void {

	}

	/**
	 * マウスダウン
	 */
	private _onMouseDown(): void {

	}

	/**
	 * マウスムーブ
	 */
	private _onMouseMove(): void {

	}

	/**
	 * マウスアップ
	 */
	private _onMouseUp(): void {

	}

}
