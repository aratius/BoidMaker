import { ReactElement } from "react";
import NextDocument, { Html, Head, Main, NextScript } from "next/document";

export default class Document extends NextDocument {

	public render(): ReactElement {
		return (
			<Html lang="ja" >
				<Head />
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}