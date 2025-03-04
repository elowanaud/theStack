import { getApi } from "@/lib/api/server";
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
		"/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
	],
};

async function checkAuth(request: NextRequest) {
	const { data, error } = await getApi(request.cookies).auth.me.$get();

	if (error || !data) {
		return false;
	}

	return data;
}
