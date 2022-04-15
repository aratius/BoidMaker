import { Container } from "pixi.js";

/**
 * 生物の形
 */
export default class CreatureShape extends Container {

	private _isEditing: boolean = false

	/**
	 *
	 * @param base ベースとなるSVG頂点
	 * @param type 生き物の種類
	 */
	constructor(base: JSON, type: string) {
		super()
	}

	/**
	 * 初期化
	 */
	public init(): void {

	}

	/**
	 * プレビューモード
	 */
	public preview(): void {

	}

	/**
	 * 編集モード
	 */
	public edit(): void {

	}

	/**
	 * 再生（プレビューモードのみ）
	 */
	public play(): void {
		if (this._isEditing) return

	}

	/**
	 * 記録
	 * @param num パラパラのコマ数
	 * @return {string[]} base64の配列
	 */
	public record(num: number): string[] {

		return []
	}

}