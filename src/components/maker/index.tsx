import { PureComponent, ReactElement } from "react";
import Editor from "./modules/editor";
import Pager from "./modules/pager";
import ToolBar from "./modules/toolBar";
import styles from "src/styles/layout/maker/index.module.scss"

/**
 *
 */
export default class Index extends PureComponent<{}, {}> {

	public render(): ReactElement {
		return (
			<main className={styles.container}>
				<ToolBar
					mode="edit"
					onDivide={(segment: number) => {}}
					onHelp={() => {}}
					onReset={() => {}}
				/>
				<Editor />
				<Pager />
			</main>
		);
	}
}