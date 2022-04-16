import { Component, ReactElement } from "react";
import MakerMain from "src/lib/webgl/maker";

interface Props { }
interface State { }

export default class Index extends Component {

	public state: State = {};
	constructor(props: Props) {
		super(props);
		this.state = {};
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
			<div ref={this._onRef} style={{
				height: "100vh"
			}}>
			</div>
		);
	}
}