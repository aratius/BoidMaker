import gsap from "gsap";
import Line from "./line";
import Points from "./points";
import Shape from "./shape";
import Waist from "./waist";

// external modules
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

	public type: string = "not defined";
	private _points: (typeof Vec2)[] = [];  // 頂点情報の配列
	private _grabPoints: (typeof Sprite)[] = [];
	private _p?: (typeof Graphics);  // 頂点
	private _s?: (typeof Graphics);  // 形
	private _l?: (typeof Graphics);  // 線
	private _waist: Waist | null = null;
	private _grabbingIndex: number = -999;
	private _segmentMag: number = 2;  // 分割数の倍率
	private _angle: number = 0;
	private _playTimeline?: GSAPTimeline;

	public get points(): (typeof Vec2) {
		return this._pointsNormalized;
	}

	public get center(): (typeof Vec2) {
		return new Vec2(this._waist!.x, this._waist!.y);
	}

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
		this._waist = new Waist(this);
		this._p.zIndex = 3;
		this._l.zIndex = 2;
		this._s.zIndex = 1;
		this._waist.zIndex = 4;
		this.addChild(this._p, this._s, this._l, this._waist);

		this._setGrabPoints();
		this._update(this._pointsNormalized);
	}

	/**
	 * 終了処理
	 */
	public deInit(): void {
		this.removeChild(this._p, this._s, this._l, this._waist);
		this._p = null;
		this._l = null;
		this._s = null;
		this._waist = null;
	}

	/**
	 * プレビューモード
	 */
	public preview(): void {
		// TODO: モード切替
		this._p.visible = false;
		this._l.visible = false;
		this._s.visible = true;
		this._waist!.visible = false;
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
		this._waist!.visible = true;
		this._grabPoints.forEach(g => g.interactive = true);
	}

	public upload(): void {
		// TODO: モード切替
		this._p.visible = false;
		this._l.visible = false;
		this._s.visible = true;
		this._waist!.visible = false;
		this._grabPoints.forEach(g => g.interactive = false);
	}

	/**
	 * 再生（プレビューモードのみ）
	 */
	public play(): void {
		if (this._playTimeline) this._playTimeline.kill();
		const RANGE = 0.2;
		this._playTimeline = gsap.timeline({ repeat: -1, onUpdate: this._updateByAngle });
		this._playTimeline.to(this, { _angle: RANGE, duration: 0.3, ease: "power2.out" });
		this._playTimeline.to(this, { _angle: -RANGE, duration: 0.6, ease: "power2.inOut" });
		this._playTimeline.to(this, { _angle: 0, duration: 0.3, ease: "power2.in" });
	}

	/**
	 * 停止(プレビューモードのみ)
	 */
	public stop(): void {
		if (this._playTimeline) this._playTimeline.kill();
		this._playTimeline = gsap.timeline();
		this._playTimeline.to(this, {
			_angle: 0,
			duration: 0.7,
			ease: "elastic.out",
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
	 * @param mag 分割倍率 2の倍数である必要がある
	 */
	public divide(mag: number): void {
		const points = this.getDividedPoints(mag);
		if (points.length == 0) return;

		this._points = points;
		this._segmentMag = mag;
		this._setGrabPoints();
		this._update(this._pointsNormalized);
	}

	/**
	 * 分割後の頂点を返す
	 * @param mag
	 * @returns
	 */
	public getDividedPoints(mag: number): (typeof Vec2)[] {
		if (mag % 2 != 0 && mag != 1) {
			console.error("mag is not multiplied of 2", mag);
			return [];
		}

		let points = this._pointsNormalized;
		let magRelated = mag / this._segmentMag;

		const increased = () => {
			while (magRelated != 1) {
				const inserted = points.map((p, i, arr) => {
					const next = i < arr.length - 1 ? arr[i + 1] : arr[0];
					const center = p.clone().add(next).divide(2);
					return center;
				});
				const newPoints: (typeof Vec2) = [];
				points.forEach((p, i) => {
					newPoints.push(p, inserted[i]);
				});
				points = newPoints;
				magRelated /= 2;
			}
		};

		const descreased = () => {
			while (magRelated != 1) {
				points = points.filter((p, i) => i % 2 == 0);
				magRelated *= 2;
			}
		};

		magRelated > 1 ? increased() : descreased();
		return points;
	}

	/**
	 * 進捗度でupdate
	 * @param prog
	 */
	public updateByProgress(prog: number): void {
		const RANGE = 0.2;
		this._angle = Math.sin(prog) * RANGE;
		this._updateByAngle();
	}

	/**
	 * 更新
	 */
	private _update(points: (typeof Vec2)[]): void {
		this._p?.update(points, this._grabbingIndex);
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
		const waistPos = new Vec2(this._waist?.x, this._waist?.y);

		this._update(
			points.map(p => {
				const pBasedWaist = p.clone().subtract(waistPos);
				const polarAngle = Math.atan2(pBasedWaist.x, pBasedWaist.y);
				const dist = p.distance(waistPos);
				const farBias = Math.pow(dist / 150, 3); // 遠い頂点は大きく動かすとダイナミックになる　そのバイアス
				let a = polarAngle + this._angle * Math.sign(pBasedWaist.y) * farBias;
				return new Vec2(Math.sin(a), Math.cos(a)).multiply(dist).add(waistPos);
			})
		);
	};

	/**
	 * グラブポイントをセットする
	 * リセット処理含む
	 */
	private _setGrabPoints(): void {
		this._grabPoints.forEach(s => {
			s.off("mousedown", this._onDown);
			s.off("touchstart", this._onDown);
		});

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
	}

	/**
	 * マウス or タッチ押下
	 * @param p
	 */
	private _onDown = (e: (typeof InteractionEvent)): void => {
		const p = e.data.getLocalPosition(this);

		// 掴んだやつのindexを検出
		let nearestI = -999;
		let nearest = 9999;
		this._grabPoints.forEach((s, i) => {
			const dist = new Vec2(p.x - s.x, p.y - s.y).length();
			if (dist < nearest) {
				nearestI = i;
				nearest = dist;
			}
		});
		this._grabbingIndex = nearestI;
		this._update(this._pointsNormalized);

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
		this._points[this._grabbingIndex] = new Vec2(p.x, p.y);  // this._pointsを上書き _pointsを上書きできるのはここだけ
		this._update(this._pointsNormalized);
	};

	/**
	 * マウス or タッチ終了
	 * @param p
	 */
	private _onUp = (e: (typeof InteractionEvent)): void => {
		this._grabbingIndex = -999;
		this._update(this._pointsNormalized);

		this.off("mousemove", this._onMove);
		this.off("mouseup", this._onUp);
		this.off("touchmove", this._onMove);
		this.off("touchend", this._onUp);
	};

}