import { Component, ReactElement } from "react";
import MakerMain from "src/lib/webgl/maker";

interface Props { }
interface State {
	isEditing: boolean
}

export default class Index extends Component {

	public state: State = {
		isEditing: false
	};
	constructor(props: Props) {
		super(props);
	}

	public componentDidMount(): void {
	}

	private _onRef = (node: HTMLDivElement): void => {
		if(!node) return
		const webgl = new MakerMain(node)
		webgl.init()
	}

	public render(): ReactElement {
		return (
			<main>

				<div ref={this._onRef} style={{
					width: "300px",
					height: "300px"
				}}>
				</div>
				<a href="">hoge</a>
				<a href="">hoge</a>
			</main>
		);
	}
}