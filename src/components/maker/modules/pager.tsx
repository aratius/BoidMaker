import { PureComponent, ReactElement } from "react";
import styles from "src/styles/layout/maker/index.module.scss"

/**
 * ページャー
 */
export default class Pager extends PureComponent {

	public render(): ReactElement {
		return(
			<ul className={styles.pager}>
				<li><a href="#">edit</a></li>
				<li><a href="#">preview</a></li>
				<li><a href="#">upload</a></li>
			</ul>
		);
	}

}