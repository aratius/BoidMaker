import { PureComponent, ReactElement } from "react";
import styles from "src/styles/layout/maker/index.module.scss"

interface Props {
	mode: string;
	onDivide: (segment: number) => void;
	onReset: () => void;
	onHelp: () => void;
}

/**
 * ツールバー
 */
export default class ToolBar extends PureComponent<Props> {

	private get _edit(): ReactElement {
		return (
			<>
				<li>
					<a href="#">
						<img src="images/toolbar/divide_wh.svg" alt="divide" />
					</a>
				</li>
				<li>
					<a href="#">
						<img src="images/toolbar/reset_wh.svg" alt="reset" />
					</a>
				</li>
				<li>
					<a href="#">
						<img src="images/toolbar/help_wh.svg" alt="help" />
					</a>
				</li>
			</>
		)
	}

	private get _preview(): ReactElement {
		return (
			<>
				<li>
					<a href="#">
						<img src="images/toolbar/help_wh.svg" alt="help" />
					</a>
				</li>
			</>
		)
	}

	public render(): ReactElement {
		const { mode } = this.props

		return (
			<ul className={styles.toolbar}>
				{mode == "edit" && this._edit}
				{mode == "preview" && this._preview}
			</ul>
		);
	}

}