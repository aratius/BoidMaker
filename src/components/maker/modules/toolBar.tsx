import { BaseSyntheticEvent, PureComponent, ReactElement } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "src/styles/layout/maker/index.module.scss"

interface Props {
	modeIndex: number;
	onDivide: (segment: number) => void;
	onReset: () => void;
	onHelp: () => void;
}

const animateOption = (i: number) => {
	return {
		initial: { opacity: 0, y: -5 },
		animate: { opacity: 1, y: 0 },
		exit: { opacity: 0, y: -5 },
		transition: { ease: "easeOut", duration: 0.2, delay: i * 0.1 },
	}
}

/**
 * ツールバー
 */
export default class ToolBar extends PureComponent<Props> {

	private _onDivideChange = (e: BaseSyntheticEvent): void => {
		if(e && e.cancelable) e.preventDefault()
		const val = e.target.value
		this.props.onDivide(val)
	}

	private get _edit(): ReactElement[] {
		return (
			[
				<motion.li
					{...animateOption(0)}
					key="divide"
				>
					<label htmlFor="divide">
						<select
							id="divide"
							name="divide"
							defaultValue="2"
							onChange={this._onDivideChange}
						>
							<option value="1">1</option>
							<option value="2">2</option>
							<option value="4">4</option>
							<option value="8">8</option>
						</select>
					</label>
				</motion.li>,
				<motion.li
					{...animateOption(1)}
					key="reset"
				>
					<a href="#">
						<img src="images/toolbar/reset_wh.svg" alt="reset" />
					</a>
				</motion.li>,
				<motion.li
					{...animateOption(2)}
					key="help"
				>
					<a href="#">
						<img src="images/toolbar/help_wh.svg" alt="help" />
					</a>
				</motion.li>
			]
		)
	}

	private get _preview(): ReactElement[] {
		return (
			[
				<></>,
				<></>,
				<motion.li
					{...animateOption(0)}
					key="help"
				>
					<a href="#">
						<img src="images/toolbar/help_wh.svg" alt="help" />
					</a>
				</motion.li>
			]
		)
	}

	public render(): ReactElement {
		const { modeIndex } = this.props
		const hideClass = modeIndex == 2 ? styles.is_hide : ""

		return (
			<ul className={`${styles.toolbar} ${hideClass}`}>
				{
					[...Array(Math.max(this._edit.length, this._preview.length))].map((_,  i) => {
						const elements = modeIndex == 0 ? this._edit : modeIndex == 1 ? this._preview : []
						return (
							<AnimatePresence key={i} exitBeforeEnter initial>
								{i < elements.length && elements[i]}
							</AnimatePresence>
						)
					})
				}
			</ul>
		);
	}

}