import gsap from "gsap";
import Line from "./line";
import Points from "./points";
import Shape from "./shape";

// pixi.js modules
const isClient = typeof window !== "undefined";
const Container = isClient ? require("pixi.js").Container : class { };
const Graphics = isClient ? require("pixi.js").Graphics : class { };
const Sprite = isClient ? require("pixi.js").Sprite : class { };
const Texture = isClient ? require("pixi.js").Texture : class { };
const InteractionEvent = isClient ? require("pixi.js").InteractionEvent : class { };
const Vec2 = isClient ? require("vec2") : class { };

// アートボードサイズ
const POINTS_RECT = new Vec2(300, 300);

/**
 * 生物の形
 */
export default class CreatureShape extends Container {

	public type: string = "not definced";
	private _points: (typeof Vec2)[] = [];  // 頂点情報の配列
	private _grabPoints: (typeof Sprite)[] = [];
	private _p?: (typeof Graphics);  // 頂点
	private _s?: (typeof Graphics);  // 形
	private _l?: (typeof Graphics);  // 線
	private _grabbingIndex: number = -999;
	private _segmentRatio: number = 2;  // 分割数の倍率
	private _angle: number = 0;
	private _playTimeline?: GSAPTimeline;

	private get _pointsNormalized(): (typeof Vec2)[] {
		// TODO: ここハードコードなので
		const stageSize = new Vec2(300, 300);
		return this._points.map(p => p.divide(POINTS_RECT).multiply(stageSize));
	}

	/**
	 *
	 * @param base ベースとなるSVG頂点
	 * @param type 生き物の種類
	 */
	constructor(points: (typeof Vec2)[], type: string) {
		super();
		this.type = type;
		this._points = points;

		this.sortableChildren = true;
		this.interactive = true;
	}

	/**
	 * 初期化
	 */
	public init(): void {
		this._p = new Points();
		this._l = new Line();
		this._s = new Shape();
		this._p.zIndex = 3;
		this._l.zIndex = 2;
		this._s.zIndex = 1;
		this.addChild(this._p, this._s, this._l);

		this._grabPoints = this._points.map(_ => {
			const s = new Sprite(Texture.WHITE);
			s.width = 20;
			s.height = 20;
			s.zIndex = 4;
			s.anchor.x = 0.5;
			s.anchor.y = 0.5;
			s.alpha = 0;  // 掴むための目印なのでalphaは0
			s.interactive = true;
			this.addChild(s);
			s.on("mousedown", this._onDown);
			s.on("touchstart", this._onDown);
			return s;
		});

		this._update(this._pointsNormalized);
	}

	/**
	 * プレビューモード
	 */
	public preview(): void {
		// TODO: モード切替
		this._p.visible = false;
		this._l.visible = false;
		this._s.visible = true;
		this._grabPoints.forEach(g => g.interactive = false);
	}

	/**
	 * 編集モード
	 */
	public edit(): void {
		// TODO: モード切替
		this._p.visible = true;
		this._l.visible = true;
		this._s.visible = true;
		this._grabPoints.forEach(g => g.interactive = true);
	}

	/**
	 * 再生（プレビューモードのみ）
	 */
	public play(): void {
		if (this._playTimeline) this._playTimeline.kill();
		const RANGE = 0.1;
		this._playTimeline = gsap.timeline({ repeat: -1, onUpdate: this._updateByAngle });
		this._playTimeline.to(this, { _angle: RANGE, duration: 0.5, ease: "power2.out" });
		this._playTimeline.to(this, { _angle: -RANGE, duration: 1, ease: "power2.inOut" });
		this._playTimeline.to(this, { _angle: 0, duration: 0.5, ease: "power2.in" });
	}

	/**
	 * 停止(プレビューモードのみ)
	 */
	public stop(): void {
		if (this._playTimeline) this._playTimeline.kill();
		this._playTimeline = gsap.timeline();
		this._playTimeline.to(this, {
			_angle: 0,
			duration: 0.2,
			ease: "expo.out",
			onUpdate: this._updateByAngle
		});
	}

	/**
	 * 記録（プレビューモードのみ）
	 * @param num パラパラのコマ数
	 * @return {string[]} base64の配列
	 */
	public record(num: number): string[] {
		return [];
	}

	/**
	 * 分割数を変更（編集モードのみ）
	 * @param ratio 1 ~ 4の整数
	 */
	public divide(ratio: number): void {
	}

	/**
	 * 更新
	 */
	private _update(points: (typeof Vec2)[]): void {
		this._p?.update(points);
		this._l?.update(points);
		this._s?.update(points);

		this._grabPoints.forEach((s, i) => {
			const p = this._points[i];
			s.x = p.x;
			s.y = p.y;
		});
	}

	/**
	 * 角度指定で更新（play時）
	 * @param angle
	 */
	private _updateByAngle = (): void => {
		const points = this._pointsNormalized;
		const center = POINTS_RECT.clone().divide(2);
		const rotateCenter = new Vec2(150, 200);

		this._update(
			points.map(p => {
				const pBasedCenter = p.clone().subtract(rotateCenter);
				const polarAngle = Math.atan2(pBasedCenter.x, pBasedCenter.y);
				let a = polarAngle + this._angle * Math.sign(pBasedCenter.y);
				const dist = p.distance(rotateCenter);
				return new Vec2(Math.sin(a), Math.cos(a)).multiply(dist).add(rotateCenter);
			})
		);
	};

	/**
	 * マウス or タッチ押下
	 * @param p
	 */
	private _onDown = (e: (typeof InteractionEvent)): void => {
		const p = e.data.getLocalPosition(this);

		let nearestI = -9999;
		let nearest = 9999;

		this._grabPoints.forEach((s, i) => {
			const dist = new Vec2(p.x - s.x, p.y - s.y).length();
			if (dist < nearest) {
				nearestI = i;
				nearest = dist;
			}
		});

		this._grabbingIndex = nearestI;

		this.on("mousemove", this._onMove);
		this.on("mouseup", this._onUp);
		this.on("touchmove", this._onMove);
		this.on("touchend", this._onUp);
	};

	/**
	 * マウス or タッチ移動
	 * @param p
	 */
	private _onMove = (e: (typeof InteractionEvent)): void => {
		if (this._grabbingIndex < 0 || this._grabbingIndex > this._grabPoints.length - 1) return;

		const p = e.data.getLocalPosition(this);
		this._points[this._grabbingIndex] = new Vec2(p.x, p.y);
		this._update(this._pointsNormalized);
	};

	/**
	 * マウス or タッチ終了
	 * @param p
	 */
	private _onUp = (e: (typeof InteractionEvent)): void => {
		this._grabbingIndex = -999;

		this.off("mousemove", this._onMove);
		this.off("mouseup", this._onUp);
		this.off("touchmove", this._onMove);
		this.off("touchend", this._onUp);
	};

}