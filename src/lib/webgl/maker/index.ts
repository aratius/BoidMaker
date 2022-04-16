const isClient = typeof window !== "undefined"
const Application = isClient ? require("pixi.js").Application : undefined

/**
 * Makerのエントリーポイント
 */
export default class MakerMain {

	private _app?: typeof Application

	/**
	 * コンストラクタ
	 * @param dom
	 */
	constructor(dom: HTMLElement) {
		this._app = new Application({ resizeTo: dom })
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
