import { env } from "@/lib/env";
import type { ApiDefinition } from "@the-stack/backend/api";
import { createTuyau } from "@tuyau/client";
import { superjson } from "@tuyau/superjson/plugin";

export const useApi = createTuyau<{ definition: ApiDefinition }>({
	baseUrl: env.NEXT_PUBLIC_API_URL,
	credentials: "include",
	plugins: [superjson()],
});
