import upload from "src/server/upload";
import CreatureShape from "./modules/creatureShape";
import Parser from "./modules/parser";
import { CIRCLE, FISH } from "./modules/svg";
const isClient = typeof window !== "undefined";
const Application = isClient ? require("pixi.js").Application : class { };

/**
 * Makerのエントリーポイント
 */
export default class MakerMain {

	private _app?: typeof Application;
	private _shape?: CreatureShape;

	/**
	 * コンストラクタ
	 * @param dom
	 */
	constructor(dom: HTMLElement) {
		this._app = new Application({ resizeTo: dom, transparent: true });
		dom.appendChild(this._app.view);

		const points = Parser.parsePoints(FISH);
		this._shape = new CreatureShape(points, "circle");
		this._app.stage.addChild(this._shape);
	}

	/**
	 * 初期化
	 */
	public init(): void {
		this._shape?.init();
	}

	/**
	 * プレビューモード
	 */
	public preview(): void {
		this._shape?.preview();
	}

	/**
	 * 編集モード
	 */
	public edit(): void {
		this._shape?.edit();
	}

	/**
	 * アップロードモード
	 */
	public upload(): void {
		const points = this._shape?.points;
		const center = this._shape?.center;
		// upload(points, center);
	}

	/**
	 * 再生
	 */
	public play(): void {
		this._shape?.play();
	}

	/**
	 * 停止(プレビューモードのみ)
	 */
	public stop(): void {
		this._shape?.stop();
	}

	/**
	 * 頂点リセット
	 */
	public reset(): void {
		this._shape?.deInit();
		const points = Parser.parsePoints(FISH);
		this._shape = new CreatureShape(points, "circle");
		this._app.stage.addChild(this._shape);
		this._shape.init();
	}

	/**
	 * 記録
	 * @param num
	 */
	public record(num: number): void {
		this._shape?.record(num);
	}

	/**
	 * 分割
	 * @param ratio
	 */
	public divide(ratio: number): void {
		this._shape?.divide(ratio);
	}

}
