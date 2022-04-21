import { PureComponent, ReactElement } from "react";
import MakerMain from "src/lib/webgl/maker";
import styles from "src/styles/layout/maker/index.module.scss"

interface Props {
	isPreviewMode: boolean
}

interface State {
	isPlaying: boolean
}

export default class Editor extends PureComponent<Props, State> {

	private _webgl?: MakerMain

	constructor(props: Props) {
		super(props)
		this.state = {
			isPlaying: false
		}
	}

	componentDidUpdate(prevProps: Props, prevState: State) {
		const { isPlaying } = this.state
		if(prevState.isPlaying != isPlaying) {
			isPlaying ? this._play() : this._stop()
		}
	}

	private _togglePlayMode = (): void => {
		this.setState({ isPlaying: !this.state.isPlaying })
	}

	private _divide(): void {

	}

	private _edit(): void {

	}

	private _preview(): void {

	}

	private _upload(): void {

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
		const { isPreviewMode } = this.props
		const { isPlaying } = this.state
		const btnClass = isPlaying ? styles.is_stop : ""
		return (
			<div ref={this._onRef} className={styles.editor}>
				{/* play button */}
				{
					isPreviewMode && <a href="#" className={btnClass} onClick={this._togglePlayMode}></a>
				}
			</div>
		)
	}

}