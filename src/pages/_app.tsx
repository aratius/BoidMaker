import "src/styles/app.scss";
import type { AppProps } from "next/app";
import Head from "next/head";

const App = ({ Component, pageProps }: AppProps) => (
	<>
		<Head>
			<meta
				name="viewport"
				content="width=device-width, initial-scale=1, shrink-to-fit=no"
			/>
		</Head>
		<Component {...pageProps} />
	</>
);

export default App