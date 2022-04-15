import { Container } from "pixi.js";
import Vec2 from "vec2"

/**
 * 生物の形
 */
export default class CreatureShape extends Container {

	private _points: Vec2[] = []  // 頂点情報の配列
	private _segmentRatio: number = 2  // 分割数の倍率
	private _isEditing: boolean = false  // 編集モードかどうか, falseならプレビューモード

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
		// TODO: モード切替

		this._isEditing = false
	}

	/**
	 * 編集モード
	 */
	public edit(): void {
		// TODO: モード切替

		this._isEditing = true
	}

	/**
	 * 再生（プレビューモードのみ）
	 */
	public play(): void {
		if (this._isEditing) return

	}

	/**
	 * 記録（プレビューモードのみ）
	 * @param num パラパラのコマ数
	 * @return {string[]} base64の配列
	 */
	public record(num: number): string[] {
		if (this._isEditing) return []

		return []
	}

	/**
	 * 分割数を変更（編集モードのみ）
	 * @param ratio 1 ~ 4の整数
	 */
	public divide(ratio: number): void {
		if (!this._isEditing) return

	}

}