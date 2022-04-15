import { Graphics } from "pixi.js";
import Vec2 from "vec2";

/**
 * 形
 * 最終的にレンダリングしてアップロードするのはここだけ
 */
export default class Shape extends Graphics {

	constructor() {
		super()
	}

	/**
	 * 更新
	 * @param points
	 */
	public update(points: Vec2[]): void {

	}

}