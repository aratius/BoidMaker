const isClient = typeof window !== "undefined"
import Parser from "./modules/parser";
import { svgXml } from "./modules/svg";
const Application = isClient ? require("pixi.js").Application : undefined

/**
 * Makerのエントリーポイント
 */
export default class MakerMain {

	private _app?: typeof Application

	constructor(dom: HTMLElement) {
		if (typeof document !== undefined) {
			this._app = new Application({ width: innerWidth, height: innerHeight })
			dom.appendChild(this._app.view)
			window.addEventListener("resize", this._onResize)
		}
	}

	/**
	 * 初期化
	 */
	public init(): void {
		Parser.parsePoints(svgXml)
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
