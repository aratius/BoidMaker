const isClient = typeof window !== "undefined"
const Graphics = isClient ? require("pixi.js").Graphics : class { }
const Vec2 = isClient ? require("vec2") : undefined

/**
 * 線
 */
export default class Line extends Graphics {

	constructor() {
		super()
	}

	/**
	 * 更新
	 * @param points
	 */
	public update(points: (typeof Vec2)[]): void {
		this.lineStyle(3, 0xffffff, 1)
		points.map((p, i) => {
			i == 0 ? this.moveTo(p.x, p.y) : this.lineTo(p.x, p.y)
		})
	}

}
