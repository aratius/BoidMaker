import { PureComponent, ReactElement } from "react";
import MakerMain from "src/lib/webgl/maker";
import styles from "src/styles/layout/maker/index.module.scss"

interface Props {
	modeIndex: number;
	segment: number;
}

interface State {
	isPlaying: boolean;
}

export default class Editor extends PureComponent<Props, State> {

	private _webgl?: MakerMain

	constructor(props: Props) {
		super(props)
		this.state = {
			isPlaying: false
		}
	}

	componentDidMount() {
		const { modeIndex } = this.props

		modeIndex == 0 && this._edit()
		modeIndex == 1 && this._preview()
		modeIndex == 2 && this._upload()
	}

	componentDidUpdate(prevProps: Props, prevState: State) {
		const { isPlaying } = this.state
		const { modeIndex, segment } = this.props

		if(prevState.isPlaying != isPlaying) {
			isPlaying ? this._play() : this._stop()
		}

		if(prevProps.modeIndex != modeIndex) {
			modeIndex == 0 && this._edit()
			modeIndex == 1 && this._preview()
			modeIndex == 2 && this._upload()
		}

		if(prevProps.segment != segment) {
			this._divide(segment)
		}
	}

	private _togglePlayMode = (): void => {
		this.setState({ isPlaying: !this.state.isPlaying })
	}

	private _divide(segment: number): void {
		this._webgl?.divide(segment)
	}

	private _edit(): void {
		this._webgl?.edit()
		const { isPlaying } = this.state
		isPlaying && this._stop()
	}

	private _preview(): void {
		this._webgl?.preview()
	}

	private _upload(): void {
		// this._webgl.up
	}

	private _play(): void {
		this._webgl?.play()
	}

	private _stop(): void {
		this._webgl?.stop()
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

	public render(): ReactElement {
		const { modeIndex } = this.props
		const { isPlaying } = this.state
		const btnClass = isPlaying ? styles.is_stop : ""
		return (
			<div ref={this._onRef} className={styles.editor}>
				{/* play button */}
				{
					modeIndex == 1 && <a href="#" className={btnClass} onClick={this._togglePlayMode}></a>
				}
			</div>
		)
	}

}