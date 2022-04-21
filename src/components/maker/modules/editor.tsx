import { PureComponent, ReactElement } from "react";
import MakerMain from "src/lib/webgl/maker";
import styles from "src/styles/layout/maker/index.module.scss"

export default class Editor extends PureComponent {

	private _webgl?: MakerMain

	private _divide(): void {

	}

	private _edit(): void {

	}

	private _preview(): void {

	}

	private _upload(): void {

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
		return (
			<div ref={this._onRef} className={styles.editor}>
				{/* play button */}
				<a href="#"></a>
			</div>
		)
	}

}