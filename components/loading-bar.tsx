import Router from "next/router"
import NProgress from "nprogress"

export type LoadingBarProps = {
	trickleSpeed?: number
	delay?: number
}

export default function LoadingBar({ trickleSpeed = 200, delay = 200 }: LoadingBarProps) {
	NProgress.configure({
		showSpinner: false,
		trickleSpeed
	})
	let timer: NodeJS.Timeout;
	let loading = false;

	function start() {
		if (loading) {
			return
		}
		loading = true
		timer = setTimeout(function () {
			NProgress.start();
		}, delay);
	}

	function stop() {
		if (!loading) {
			return
		}
		NProgress.done()
		clearTimeout(timer)
		loading = false
	}

	Router.events.on("routeChangeStart", start);
	Router.events.on("routeChangeComplete", stop);
	Router.events.on("routeChangeError", stop);

	return (
		<style jsx global>{`
			#nprogress {
				pointer-events: none;
			}

			#nprogress .bar {
				background: var(--accent-tertiary);
				position: fixed;
				z-index: 3000;
				top: 0;
				left: 0;
				width: 100%;
				height: 2px;
			}

			#nprogress .peg {
				display: block;
				position: absolute;
				right: 0px;
				width: 100px;
				height: 100%;
				box-shadow: 0 0 15px var(--accent-secondary), 0 0 10px var(--accent-secondary);
				opacity: 1.0;
				-webkit-transform: rotate(3deg) translate(0px, -4px);
				-ms-transform: rotate(3deg) translate(0px, -4px);
				transform: rotate(3deg) translate(0px, -4px);
			}
		`}</style>
	)
}
