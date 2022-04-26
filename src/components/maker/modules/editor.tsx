import { PureComponent, ReactElement } from "react";
import { INDEX_EDIT, INDEX_PREVIEW, INDEX_UPLOAD } from "src/constants/editor";
import UploadInteraction from "src/lib/editor/uploadInteraction";
import MakerMain from "src/lib/webgl/maker";
import upload from "src/server/upload";
import styles from "src/styles/layout/maker/index.module.scss"

interface Props {
	modeIndex: number;
	segment: number;
	onCompleteUpload: () => void
}

interface State {
	isPlaying: boolean;
}

/**
 * 編集画面
 */
export default class Editor extends PureComponent<Props, State> {

	private _webgl?: MakerMain  // webgl
	private _uploadInteraction?: UploadInteraction

	/**
	 * コンストラクタ
	 * @param props
	 */
	constructor(props: Props) {
		super(props)
		this.state = {
			isPlaying: false
		}
	}

	componentDidMount() {
		const { modeIndex } = this.props

		modeIndex == INDEX_EDIT && this._edit()
		modeIndex == INDEX_PREVIEW && this._preview()
		modeIndex == INDEX_UPLOAD && this._upload()
	}

	componentDidUpdate(prevProps: Props, prevState: State) {
		const { isPlaying } = this.state
		const { modeIndex, segment } = this.props

		if(prevState.isPlaying != isPlaying) {
			isPlaying ? this._play() : this._stop()
		}

		if(prevProps.modeIndex != modeIndex) {
			modeIndex == INDEX_EDIT && this._edit()
			modeIndex == INDEX_PREVIEW && this._preview()
			modeIndex == INDEX_UPLOAD && this._upload()
		}

		if(prevProps.segment != segment) {
			this._divide(segment)
		}
	}

	/**
	 * リセット
	 */
	public reset(): void {
		this._webgl?.reset()
	}

	/**
	 * プレイモード変更
	 */
	private _togglePlayMode = (): void => {
		this.setState({ isPlaying: !this.state.isPlaying })
	}

	/**
	 * 分割
	 * @param segment
	 */
	private _divide(segment: number): void {
		this._webgl?.divide(segment)
	}

	/**
	 * 編集
	 */
	private _edit(): void {
		this._webgl?.edit()
		this.setState({ isPlaying: false })
		this._uploadInteraction?.end()
	}

	/**
	 * プレビュー
	 */
	private _preview(): void {
		this._webgl?.preview()
		this._uploadInteraction?.end()
	}

	/**
	 * アップロード
	 */
	private _upload(): void {
		this._webgl?.upload()
		this.setState({ isPlaying: false })
		this._uploadInteraction?.start()
	}

	/**
	 * 再生
	 */
	private _play(): void {
		this._webgl?.play()
	}

	/**
	 * 停止
	 */
	private _stop(): void {
		this._webgl?.stop()
	}

	/**
	 * アップロードインタラクションの更新時
	 * @param y
	 */
	private _onUpdateUploadinteraction = (y: number): void => {
		this._webgl?.updateByProgress(y/10)
	}

	/**
	 * アップロード完了
	 */
	private _onCompleteUpload = async (): Promise<void> => {
		// アップロード時にかならず頂点分割は8にしてからアップロード
		// 子供作るときに頂点の計算がややこしくなるため
		const points = this._webgl?.getPoints(8)
		const center = this._webgl?.center
		if(points && center) await upload(points, center)
		this.props.onCompleteUpload()
		alert("upload complete!");
		this._uploadInteraction?.reset()
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
		this._uploadInteraction = new UploadInteraction(node)
		this._uploadInteraction.on(UploadInteraction.UPDATE, this._onUpdateUploadinteraction)
		this._uploadInteraction.on(UploadInteraction.COMPLETE, this._onCompleteUpload)
	}

	public render(): ReactElement {
		const { modeIndex } = this.props
		const { isPlaying } = this.state
		const btnClass = isPlaying ? styles.is_stop : ""
		const wrapperClass = modeIndex == INDEX_UPLOAD ? styles.is_upload : ""
		return (
			<div ref={this._onRef} className={`${styles.editor} ${wrapperClass}`}>
				{/* play button */}
				{
					modeIndex == INDEX_PREVIEW && (
					<a
						href="#"
						className={btnClass}
						onClick={this._togglePlayMode}
					></a>
					)
				}
			</div>
		)
	}

}