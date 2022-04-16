import Vec2 from "vec2";

/**
 * svgをパースする
 */
export default class Parser {

	/**
	 * 頂点のパース
	 * このプロジェクト依存の汎用性0モジュールで良いと思ってる
	 * @param svgStr
	 * @returns
	 */
	public static parsePoints(svgStr: string): Vec2[] {
		const parser = new DOMParser()
		const xml = svgStr
		const doc = parser.parseFromString(xml, "image/svg+xml")
		const circles = doc.querySelectorAll("circle")
		const points: Vec2[] = []
		for (let i = 0; i < circles.length; i++) {
			const c = circles[i]
			const x = c.getAttribute("cx")
			const y = c.getAttribute("cy")
			points.push(new Vec2(Number(x), Number(y)))
		}

		return points
	}
}