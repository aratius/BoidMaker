import EventEmitter from "events";
import gsap from "gsap";

const SPEED_THRESHOLD = 20;

export default class UploadInteraction extends EventEmitter {

	public static END: string = "end";
	public static UPDATE: string = "update";

	private _container?: HTMLElement;
	private _speed: number = 0;
	private _touchStartY: number = -999;
	private _lastTouchY: number = -999;
	private _uploadtimeline: GSAPTimeline | null = null;

	constructor(container: HTMLElement) {
		super();
		this._container = container;
	}

	private get _y(): number {
		return gsap.getProperty(this._container!, "y") as number;
	}

	public start(): void {
		window.addEventListener("touchstart", this._onTouchStart);
	}

	public end(): void {
		window.removeEventListener("touchstart", this._onTouchStart);
	}

	private _onTouchStart = (e: TouchEvent): void => {
		window.addEventListener("touchmove", this._onTouchMove);
		window.addEventListener("touchend", this._onTouchEnd);

		if (e.touches.length > 0) {
			this._touchStartY = e.touches[0].clientY;
			this._lastTouchY = this._touchStartY;
		}
	};

	private _onTouchMove = (e: TouchEvent): void => {
		if (e.touches.length > 0) {
			const y = e.touches[0].clientY;
			if (y < this._touchStartY) {
				gsap.set(this._container!, { y: y - this._touchStartY });
			}
			this._speed = y - this._lastTouchY;
			this._lastTouchY = y;
		}
		this.emit(UploadInteraction.UPDATE, this._y);
	};

	private _onTouchEnd = (e: TouchEvent): void => {
		if (this._speed < -SPEED_THRESHOLD) this._upload();
		else this._cancelUpload();

		window.removeEventListener("touchmove", this._onTouchMove);
		window.removeEventListener("touchend", this._onTouchEnd);
	};

	private _upload(): void {
		if (this._uploadtimeline != null) this._uploadtimeline.kill();
		this._uploadtimeline = gsap.timeline({
			onUpdate: () => { this.emit(UploadInteraction.UPDATE, this._y); }
		});
		this._uploadtimeline.to(this._container!, { y: -innerHeight / 3, ease: "expo.out" }, 0);
		this._uploadtimeline.to(this._container!, {
			alpha: 0, ease: "sine.out",
			onComplete: () => {
				alert("upload complete!");
				this.emit(UploadInteraction.END);
			},
		}, 0);
		this._uploadtimeline.set(this._container!, { y: 10 });
		this._uploadtimeline.to(this._container!, { y: 0, alpha: 1, ease: "expo.out" });
	}

	private _cancelUpload(): void {
		if (this._uploadtimeline != null) this._uploadtimeline.kill();
		this._uploadtimeline = gsap.timeline({
			onUpdate: () => { this.emit(UploadInteraction.UPDATE, this._y); }
		});
		this._uploadtimeline.to(this._container!, { y: 0, ease: "circ.out" }, 0);
		this._uploadtimeline.to(this._container!, { alpha: 1, ease: "sine.out" }, 0);
	}

}