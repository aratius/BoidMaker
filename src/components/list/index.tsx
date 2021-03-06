import { Component, ReactElement } from "react";
import getData from "src/server/get";
import Vec2 from "vec2";
import styles from "src/styles/layout/list/index.module.scss"
import createChild from "src/server/createChild";
import deleteFish from "src/server/delete";

interface Fish {
	points: Vec2[],
	center: Vec2[],
	image: string,
	generation: number
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
				const { points, center, image, generation } = fish
				fishes[fish.id] = {
					points: JSON.parse(points),
					center: JSON.parse(center),
					image,
					generation
				}
			})

			this.setState({
				...this.state,
				fishes
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
		this._update()
	}

	private _deleteChild = async(): Promise<void> => {
		const { fishes, selected } = this.state
		if(selected.length < 1) return
		const target = selected[0]
		const fish = fishes[target]
		const res = await deleteFish(selected[0], fish.generation);

		this.setState({selected: []})
		this._update()
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
				<input type="submit" value="DELETE" onClick={this._deleteChild} />

				<p className={styles.child}>
					<img src={child} alt="" />
				</p>

			</main>
		)
	}

}