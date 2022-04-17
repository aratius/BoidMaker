import { PureComponent, ReactElement, SyntheticEvent } from "react";
import MakerMain from "src/lib/webgl/maker";

interface State {
	isEditing: boolean;
	segmentRatio: number
}

export default class Index extends PureComponent<{}, State> {

	private _webgl?: MakerMain
	public state: State = {
		isEditing: true,
		segmentRatio: 2
	};

	public componentDidMount(): void {
		this.state.isEditing ? this._webgl?.edit() : this._webgl?.preview()
	}

	componentDidUpdate(_: never, prevState: State): void {
		if(this.state.isEditing != prevState.isEditing)
			this.state.isEditing ? this._webgl?.edit() : this._webgl?.preview()
	}

	private _onRef = (node: HTMLDivElement): void => {
		if(!node) return
		this._webgl = new MakerMain(node)
		this._webgl.init()
	}

	private _toggleMode = (e: SyntheticEvent): void => {
		if(e && e.cancelable) e.preventDefault()
		this.setState({ isEditing: !this.state.isEditing })
	}

	private _play = (e: SyntheticEvent): void => {
		if(e && e.cancelable) e.preventDefault()
		if(!this.state.isEditing) this._webgl?.play()
	}

	private _divide = (e: SyntheticEvent): void => {
		if(e && e.cancelable) e.preventDefault()
		if(this.state.isEditing) this._webgl?.divide(this.state.segmentRatio)
	}

	public render(): ReactElement {
		const {isEditing} = this.state
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
					onClick={this._play}
					style={isEditing && disableStyle || {}}
				>
					play
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