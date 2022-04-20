const isClient = typeof window !== "undefined";
const Graphics = isClient ? require("pixi.js").Graphics : class { };
const Vec2 = isClient ? require("vec2") : undefined;

/**
 * 各頂点
 */
export default class Points extends Graphics {

	constructor() {
		super();
	}

	/**
	 * 更新
	 * @param points
	 */
	public update(points: (typeof Vec2)[]): void {
		this.clear();
		this.beginFill(0x000000, 0.3);
		this.lineStyle(1, 0xffffff, 0.3);
		for (let i = 0; i < points.length; i++) {
			const p = points[i];
			this.drawCircle(p.x, p.y, 5, 5);
		}
	}

}