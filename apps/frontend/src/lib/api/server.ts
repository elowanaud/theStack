import type { ApiDefinition } from "@the-stack/backend/api";
import { createTuyau } from "@tuyau/client";
import { superjson } from "@tuyau/superjson/plugin";
import type { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";
import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export const getApi = (cookie: ReadonlyRequestCookies | RequestCookies) =>
	createTuyau<{ definition: ApiDefinition }>({
		baseUrl: "http://localhost:3333",
		credentials: "include",
		headers: {
			cookie: cookie.toString(),
		},
		plugins: [superjson()],
	});
