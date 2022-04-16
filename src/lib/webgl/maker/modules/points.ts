const isClient = typeof window !== "undefined"
const Graphics = isClient ? require("pixi.js").Graphics : class { }
const Vec2 = isClient ? require("vec2") : undefined

/**
 * 各頂点
 */
export default class Points extends Graphics {

	constructor() {
		super()
	}

	/**
	 * 更新
	 * @param points
	 */
	public update(points: (typeof Vec2)[]): void {
		for (let i = 0; i < points.length; i++) {
			const p = points[i]
			this.beginFill(0xfff000, 1)
			this.drawCircle(p.x, p.y, 5, 5)
		}
	}

	/**
	 * 出す
	 */
	public show(): void {

	}

	/**
	 * 隠す
	 */
	public hide(): void {

	}

}