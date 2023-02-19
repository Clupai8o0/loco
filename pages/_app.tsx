import "@/styles/globals.css";

import * as React from "react";
import { AppProps } from "next/app";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";

import theme from "../config/theme";
import createEmotionCache from "../config/createEmotionCache";

const clientSideEmotionCache = createEmotionCache();

interface MUIAppProps extends AppProps {
	emotionCache?: EmotionCache;
}

export default function App(props: MUIAppProps) {
	const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
	return (
		<CacheProvider value={emotionCache}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Component {...pageProps} />
			</ThemeProvider>
		</CacheProvider>
	);
}
