import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { useRouter } from "next/router";
import { AnimatePresence, motion, cubicBezier } from "framer-motion";

export default function App({ Component, pageProps }: AppProps) {
	const router = useRouter();

	return (
		<AnimatePresence mode="wait">
			<motion.div
				className="w-full h-full absolute top-0 left-0 z-50 bg-blue-600"
				initial={{ top: 0 }}
				animate={{
					top: "-100%",
					transition: {
						ease: cubicBezier(0.79, 0.14, 0.15, 0.86),
					},
				}}
				exit={{ top: 0 }}
				transition={{ duration: 0.6 }}
        key={router.asPath}
			></motion.div>

			<main>
				<Component {...pageProps} />
			</main>
		</AnimatePresence>
	);
}
