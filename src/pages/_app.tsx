import "@/styles/globals.css";
import "@/styles/font/Troylinesans/stylesheet.css";
import "@/styles/font/Weissenhof/stylesheet.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
