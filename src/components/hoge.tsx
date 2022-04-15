import { Component, ReactElement } from "react";
import styles from "src/styles/layout/hoge.module.scss";

interface Props { }
interface State { }

export default class Hoge extends Component {

	public state: State = {};
	constructor(props: Props) {
		super(props);
		this.state = {};
	}

	public componentDidMount(): void {
	}

	public render(): ReactElement {
		return (
			<main className={styles.container}>
				<h1>title</h1>
				<ul>
					<li>hoge</li>
					<li>hoge</li>
					<li>hoge</li>
					<li>hoge</li>
				</ul>
			</main>
		);
	}
}