import { Component, ReactElement } from "react";
import getData from "src/server/get";
import Vec2 from "vec2";
import styles from "src/styles/layout/list/index.module.scss"
import createChild from "src/server/createChild";

interface Fish {
	points: Vec2[],
	center: Vec2[],
	image: string
}

interface Props {}

interface State {
	fishes: {[id: string]: Fish},
	selected: string[],
	child: string
}

export default class Index extends Component<Props, State> {

	constructor(props: Props) {
		super(props)
		this.state = {
			fishes: {},
			selected: [],
			child: ""
		}
	}

	componentDidMount() {
		this._update()
	}

	private async _update(): Promise<void> {
		try {
			const data  = await getData()
			const fishes: {[id: string]: Fish} = {}
			data.body.Items.forEach((fish: any) => {
				const { points, center, image } = fish
				fishes[fish.id] = {
					points: JSON.parse(points),
					center: JSON.parse(center),
					image,
				}
			})

			this.setState({
				...this.state,
				fishes: {
					...this.state.fishes,
					...fishes
				}
			})
		} catch(err) {
			console.error(err)
		}
	}

	private _onClick = (id: string): void => {

		const selected = [...this.state.selected]
		if(selected.indexOf(id) >= 0) {
			for(let i = 0; i < selected.length; i++)
				if(selected[i] == id) selected.splice(i, 1)
		} else selected.push(id)

		while(selected.length > 2) selected.splice(0, 1)

		this.setState({	selected })
	}

	private _createChild = async (): Promise<void> => {
		const { fishes, selected } = this.state
		if(selected.length != 2) return
		const parents = [fishes[selected[0]], fishes[selected[1]]]
		const res = await createChild([{...parents[0], id: selected[0]}, {...parents[1], id: selected[1]}], 2)
		this.setState({child: res.body.image})

	}

	render(): ReactElement {
		const { fishes, selected, child } = this.state

		return (
			<main className={styles.container}>
				<ul>
					{
						Object.keys(fishes).map((id, i) => {
							const selectedClass = selected.indexOf(id) >= 0 ? styles.is_selected : ""
							return (
								<li key={id} onClick={() => this._onClick(id)} className={selectedClass}>
									<img src={fishes[id].image} alt="" />
								</li>
							)
						})
					}
				</ul>

				<input type="submit" value="CHILD" onClick={this._createChild} />

				<p className={styles.child}>
					<img src={child} alt="" />
				</p>

			</main>
		)
	}

}