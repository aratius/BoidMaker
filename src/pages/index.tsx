import { PureComponent, ReactElement } from "react";
import Index from "src/components/maker";

interface State {
	isEditing: boolean;
	isPlaying: boolean;
	segmentRatio: number;
}

export default class _Index extends PureComponent<{}, State> {
	public render(): ReactElement {
		return <Index />
	}
}