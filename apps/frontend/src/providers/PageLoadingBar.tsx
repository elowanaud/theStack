import NextTopLoader from "nextjs-toploader";

export function PageLoadingBarProvider() {
	return <NextTopLoader color="#615FFF" showSpinner={false} shadow={false} />;
}
