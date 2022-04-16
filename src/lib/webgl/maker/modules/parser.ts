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
		console.log(xml);

		const doc = parser.parseFromString(xml, "image/svg+xml")
		console.log(doc);

		return []
	}
}