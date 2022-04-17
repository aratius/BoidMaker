const isClient = typeof window !== "undefined";
const Vec2 = isClient ? require("vec2") : class { };

export default class GrabPoints {

	constructor() {

	}

	/**
	 * 更新
	 * @param points
	 */
	public update(points: (typeof Vec2)): void {

	}

}