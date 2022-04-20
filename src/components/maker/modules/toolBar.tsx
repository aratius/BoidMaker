import { PureComponent, ReactElement } from "react";
import styles from "src/styles/layout/maker/index.module.scss"

export default class ToolBar extends PureComponent {

	private get _edit(): ReactElement {
		return (
			<>
				<li><a href="#">divide</a></li>
				<li><a href="#">reset</a></li>
				<li><a href="#">help</a></li>
			</>
		)
	}

	private get _preview(): ReactElement {
		return (
			<>
				<li><a href="#">help</a></li>
			</>
		)
	}

	public render(): ReactElement {
		return (
			<ul className={styles.toolbar}>
				{this._edit}
				{this._preview}
			</ul>
		);
	}

}