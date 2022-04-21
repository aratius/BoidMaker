import { PureComponent, ReactElement } from "react";
import Editor from "./modules/editor";
import Pager from "./modules/pager";
import ToolBar from "./modules/toolBar";
import styles from "src/styles/layout/maker/index.module.scss"

interface State {
	modeIndex: number;
	segment: number;
}

/**
 *
 */
export default class Index extends PureComponent<{}, State> {

	private _editor: Editor | null = null

	constructor(props: {}) {
		super(props)
		this.state = {
			modeIndex: 0,
			segment: 2
		}
	}

	/**
	 * モード切替
	 * @param modeIndex
	 */
	private _onChangeMode = (modeIndex: number): void => {
		this.setState({ modeIndex })
	}

	/**
	 *
	 * @param segment
	 */
	private _onDivide = (segment: number): void => {

	}

	/**
	 *
	 */
	private _onHelp = (): void => {

	}

	/**
	 *
	 */
	private _onReset = (): void => {

	}

	public render(): ReactElement {
		const { modeIndex, segment } = this.state

		return (
			<main className={styles.container}>
				<ToolBar
					modeIndex={modeIndex}
					onDivide={this._onDivide}
					onHelp={this._onHelp}
					onReset={this._onReset}
				/>
				<Editor
					modeIndex={modeIndex}
					segment={segment}
					ref={node => this._editor = node}
				/>
				<Pager
					onChangeMode={this._onChangeMode}
				/>
			</main>
		);
	}
}