import { PureComponent, ReactElement, SyntheticEvent } from "react";
import MakerMain from "src/lib/webgl/maker";

interface State {
	isEditing: boolean;
	isPlaying: boolean;
	segmentRatio: number;
}

export default class Index extends PureComponent<{}, State> {

	private _webgl?: MakerMain
	public state: State = {
		isEditing: true,
		isPlaying: false,
		segmentRatio: 2
	};

	componentDidMount(): void {
		this.state.isEditing ? this._webgl?.edit() : this._webgl?.preview()
	}

	componentDidUpdate(_: never, prevState: State): void {
		// 編集中ステートが変わったとき
		if(this.state.isEditing != prevState.isEditing) {
			if(this.state.isEditing) {
				this._webgl?.edit()
				this.setState({ isPlaying: false })
			} else {
				this._webgl?.preview()
			}
		}

		// 再生中ステートが変わったとき
		if(this.state.isPlaying != prevState.isPlaying)
			this.state.isPlaying ? this._webgl?.play() : this._webgl?.stop()

		// 分割数ステートが変わったとき
		if(this.state.segmentRatio != prevState.segmentRatio)
			this._webgl?.divide(this.state.segmentRatio)
	}

	/**
	 * canvasラッパーのref
	 * @param node
	 * @returns
	 */
	private _onRef = (node: HTMLDivElement): void => {
		if(!node) return
		this._webgl = new MakerMain(node)
		this._webgl.init()
	}

	/**
	 * 編集<->プレビューモード切替
	 * @param e
	 */
	private _toggleMode = (e: SyntheticEvent): void => {
		if(e && e.cancelable) e.preventDefault()
		this.setState({ isEditing: !this.state.isEditing })
	}

	/**
	 * 再生<->停止モード切替
	 * @param e
	 */
	private _togglePlayMode = (e: SyntheticEvent): void => {
		if(e && e.cancelable) e.preventDefault()
		if(!this.state.isEditing) this.setState({ isPlaying: !this.state.isPlaying })
	}

	/**
	 * 分割数変更
	 * @param e
	 */
	private _divide = (e: SyntheticEvent): void => {
		if(e && e.cancelable) e.preventDefault()
		const segmentRatio = this.state.segmentRatio == 4 ? 1 : this.state.segmentRatio * 2
		if(this.state.isEditing) this.setState({ segmentRatio })
	}

	public render(): ReactElement {
		const { isEditing, isPlaying } = this.state
		const disableStyle = {opacity: 0.3}

		return (
			<main>
				<div ref={this._onRef} style={{
					width: "300px",
					height: "300px"
				}}>
				</div>
				<a
					href="#"
					onClick={this._toggleMode}
				>
					{isEditing ? "preview" : "edit"}
				</a>
				<a
					href="#"
					onClick={this._togglePlayMode}
					style={isEditing && disableStyle || {}}
				>
					{isPlaying ? "stop" : "play"}
				</a>
				<a
					href="#"
					onClick={this._divide}
					style={!isEditing && disableStyle || {}}
				>
					divide
				</a>
			</main>
		);
	}
}