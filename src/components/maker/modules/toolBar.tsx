import { BaseSyntheticEvent, Component, ReactElement } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "src/styles/layout/maker/index.module.scss"
import { HELP_URL } from "src/constants/common";
import { INDEX_EDIT, INDEX_PREVIEW, INDEX_UPLOAD } from "src/constants/editor";

interface Props {
	modeIndex: number;
	segment: number;
	onDivide: (segment: number) => void;
	onReset: () => void;
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
export default class ToolBar extends Component<Props> {

	/**
	 * 分割数を変更する
	 * @param e
	 */
	private _onDivideChange = (e: BaseSyntheticEvent): void => {
		if(e && e.cancelable) e.preventDefault()
		const val = e.target.value
		this.props.onDivide(val)
	}

	/**
	 * 編集画面
	 */
	private get _edit(): ReactElement[] {
		const { segment, onReset } = this.props
		return (
			[
				<motion.li
					{...animateOption(INDEX_EDIT)}
					key="divide"
				>
					<label htmlFor="divide">
						<select
							id="divide"
							name="divide"
							value={segment.toString()}
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
					{...animateOption(INDEX_PREVIEW)}
					key="reset"
				>
					<a href="#" onClick={onReset}>
						<img src="images/toolbar/reset_bl.svg" alt="reset" />
					</a>
				</motion.li>,
				<motion.li
					{...animateOption(INDEX_UPLOAD)}
					key="help"
				>
					<a href={HELP_URL} target="_blank" rel="noreferrer">
						<img src="images/toolbar/help_bl.svg" alt="help" />
					</a>
				</motion.li>
			]
		)
	}

	/**
	 * プレビュー画面
	 */
	private get _preview(): ReactElement[] {
		return (
			[
				<></>,
				<></>,
				<motion.li
					{...animateOption(0)}
					key="help"
				>
					<a href={HELP_URL} target="_blank" rel="noreferrer">
						<img src="images/toolbar/help_bl.svg" alt="help" />
					</a>
				</motion.li>
			]
		)
	}

	public render(): ReactElement {
		const { modeIndex } = this.props
		const hideClass = modeIndex == INDEX_PREVIEW ? styles.is_hide : ""

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