import { ReactElement } from "react";
import NextDocument, { Html, Head, Main, NextScript } from "next/document";

export default class Document extends NextDocument {

	public render(): ReactElement {
		return (
			<Html lang="ja" >
				<Head>
					<link rel="manifest" href="/manifest.json" />
					<link rel="apple-touch-icon" href="icon.png" />
					<meta name="theme-color" content="#fff" />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}