const isClient = typeof window !== "undefined"
const Graphics = isClient ? require("pixi.js").Graphics : class { }
const Vec2 = isClient ? require("vec2") : undefined

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
	public update(points: (typeof Vec2)[]): void {
		this.clear()
		this.beginFill(0xff0000, 1)
		points.map((p, i) => {
			i == 0 ? this.moveTo(p.x, p.y) : this.lineTo(p.x, p.y)
		})
	}

}