import CreatureShape from "./modules/creatureShape"
import Parser from "./modules/parser"
import { svgXml } from "./modules/svg"
const isClient = typeof window !== "undefined"
const Application = isClient ? require("pixi.js").Application : class { }

/**
 * Makerのエントリーポイント
 */
export default class MakerMain {

	private _app?: typeof Application
	private _shape?: CreatureShape

	/**
	 * コンストラクタ
	 * @param dom
	 */
	constructor(dom: HTMLElement) {
		this._app = new Application({ resizeTo: dom })
		dom.appendChild(this._app.view)
		window.addEventListener("resize", this._onResize)

		const points = Parser.parsePoints(svgXml)
		this._shape = new CreatureShape(points, "circle")
		this._app.stage.addChild(this._shape)
	}

	/**
	 * 初期化
	 */
	public init(): void {
		this._shape?.init()
	}

	/**
	 * リサイズ
	 */
	private _onResize(): void {

	}



}
