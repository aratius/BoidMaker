import { Component, ReactElement } from "react";
import getData from "src/server/get";
import Vec2 from "vec2";
import styles from "src/styles/layout/list/index.module.scss"

interface Fish {
	points: Vec2[],
	center: Vec2[],
	image: string
}

interface Props {}

interface State {
	fishes: {[id: string]: Fish},
	selected: Fish[]
}

export default class Index extends Component<Props, State> {

	constructor(props: Props) {
		super(props)
		this.state = {
			fishes: {},
			selected: []
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

	render(): ReactElement {
		const { fishes } = this.state

		return (
			<main className={styles.container}>
				<ul>
					{
						Object.keys(fishes).map(id => {
							return (
								<li key={id}>
									<img src={fishes[id].image} alt="" />
								</li>
							)
						})
					}
				</ul>
			</main>
		)
	}

}