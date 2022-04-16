import Line from "./line"
import Points from "./points"
import Shape from "./shape"

// pixi.js modules
const isClient = typeof window !== "undefined"
const Container = isClient ? require("pixi.js").Container : class { }
const Graphics = isClient ? require("pixi.js").Graphics : class { }
const InteractionEvent = isClient ? require("pixi.js").InteractionEvent : class { }
const Vec2 = isClient ? require("vec2") : undefined

/**
 * 生物の形
 */
export default class CreatureShape extends Container {

	public type: string = "not definced"
	private _points: (typeof Vec2)[] = []  // 頂点情報の配列
	private _grabPoints: (typeof Graphics)[] = []
	private _p?: (typeof Graphics)
	private _s?: (typeof Graphics)
	private _l?: (typeof Graphics)
	private _segmentRatio: number = 2  // 分割数の倍率
	private _isEditing: boolean = false  // 編集モードかどうか, falseならプレビューモード

	/**
	 *
	 * @param base ベースとなるSVG頂点
	 * @param type 生き物の種類
	 */
	constructor(points: (typeof Vec2)[], type: string) {
		super()
		this.type = type
		this._points = points

		this.sortableChildren = true
		this.interactive = true
	}

	/**
	 * 初期化
	 */
	public init(): void {
		this._p = new Points()
		this._l = new Line()
		this._s = new Shape()
		this._p.zIndex = 3
		this._l.zIndex = 2
		this._s.zIndex = 1
		this.addChild(this._p, this._s, this._l)

		this._grabPoints = this._points.map(_ => {
			const g = new Graphics()
			// 本番は見えないようにする
			g.beginFill(0x00ff00, 1)
			g.interactive = true
			this.addChild(g)

			g.on("mousedown", this._onMouseDown)

			return g
		})

		this.update()
	}

	public update(): void {
		// TODO: ここハードコードなので
		const pointsRect = new Vec2(300, 300)
		const stageSize = new Vec2(300, 300)
		const points = this._points.map(p => p.divide(pointsRect).multiply(stageSize))
		this._p?.update(points)
		this._l?.update(points)
		this._s?.update(points)

		this._grabPoints.map((g, i) => {
			const p = this._points[i]
			g.drawCircle(p.x, p.y, 10, 10)
		})
	}

	/**
	 * プレビューモード
	 */
	public preview(): void {
		// TODO: モード切替
		this._p.visible = false
		this._l.visible = false
		this._s.visible = true

		this._isEditing = false
	}

	/**
	 * 編集モード
	 */
	public edit(): void {
		// TODO: モード切替
		this._p.visible = true
		this._l.visible = true
		this._s.visible = true

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

	/**
	 * タッチスタート
	 */
	private _onTouchStart(e: (typeof InteractionEvent)): void {

	}

	/**
	 * タッチムーブ
	 */
	private _onTouchMove(e: (typeof InteractionEvent)): void {

	}

	/**
	 * タッチエンド
	 */
	private _onTouchEnd(e: (typeof InteractionEvent)): void {

	}

	/**
	 * マウスダウン
	 */
	private _onMouseDown = (e: (typeof InteractionEvent)): void => {
		const p = e.data.getLocalPosition(this)
		// isFind
		this.on("mousemove", this._onMouseMove)
		this.on("mouseup", this._onMouseUp)
	}

	/**
	 * マウスムーブ
	 */
	private _onMouseMove = (e: (typeof InteractionEvent)): void => {
		const p = e.data.getLocalPosition(this)
	}

	/**
	 * マウスアップ
	 */
	private _onMouseUp = (e: (typeof InteractionEvent)): void => {
		const p = e.data.getLocalPosition(this)

		this.off("mousemove", this._onMouseMove)
		this.off("mouseup", this._onMouseUp)
	}


	/**
	 * マウス or タッチ押下
	 * @param p
	 */
	private _onDown(p: (typeof Vec2)): void {

	}

	/**
	 * マウス or タッチ移動
	 * @param p
	 */
	private _onMove(p: (typeof Vec2)): void {

	}

	/**
	 * マウス or タッチ終了
	 * @param p
	 */
	private _onUp(p: (typeof Vec2)): void {

	}

}