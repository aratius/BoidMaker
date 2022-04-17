
const isClient = typeof window !== "undefined";
const Texture = isClient ? require("pixi.js").Texture : class { };
const Sprite = isClient ? require("pixi.js").Sprite : class { };
const Container = isClient ? require("pixi.js").Container : class { };
const Graphics = isClient ? require("pixi.js").Graphics : class { };
const InteractionEvent = isClient ? require("pixi.js").InteractionEvent : class { };
const Vec2 = isClient ? require("vec2") : undefined;

/**
 * 腰
 */
export default class Waist extends Sprite {

	private _parent?: (typeof Container);

	constructor(parent: (typeof Container)) {
		super(Texture.from("circle.png"));

		this._parent = parent;

		this.width = 15;
		this.height = 15;
		this.x = 150;
		this.y = 150;
		this.anchor.x = 0.5;
		this.anchor.y = 0.5;
		this.alpha = 1;
		this.tint = 0x000000;
		this.interactive = true;

		this.on("mousedown", this._onDown);
		this.on("touchstart", this._onDown);

		this._update(new Vec2(150, 150));
	}

	private _onDown = (e: (typeof InteractionEvent)): void => {
		this._parent.on("mousemove", this._onMove);
		this._parent.on("touchmove", this._onMove);
		this._parent.on("mouseend", this._onUp);
		this._parent.on("touchend", this._onUp);
	};

	private _onMove = (e: (typeof InteractionEvent)): void => {
		const p = e.data.getLocalPosition(this._parent);
		this._update(p);
	};

	private _onUp = (e: (typeof InteractionEvent)): void => {
		this._parent.off("mousemove", this._onMove);
		this._parent.off("touchmove", this._onMove);
		this._parent.off("mouseend", this._onUp);
		this._parent.off("touchend", this._onUp);
	};

	private _update(p: (typeof Vec2)): void {
		this.x = p.x;
		this.y = p.y;
	}

}