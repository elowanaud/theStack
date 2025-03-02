import { sleep } from "@/utils/sleep";
import { type NextRequest, NextResponse } from "next/server";

const GUEST_ROUTES = ["/login", "/register"];

export async function middleware(request: NextRequest) {
	const isGuestRoute = GUEST_ROUTES.includes(request.nextUrl.pathname);
	const isAuthenticated = await checkAuth(request);

	if (isAuthenticated && isGuestRoute) {
		return NextResponse.redirect(new URL("/", request.url));
	}

	if (isAuthenticated || isGuestRoute) {
		return NextResponse.next();
	}

	return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
	matcher: [
		// biome-ignore lint/nursery/noSecrets: <explanation>
		"/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
	],
};

async function checkAuth(request: NextRequest) {
	await sleep(1);
	// TODO: fetch user from cookie
	return false;
}
