import { env } from "@/lib/env";
import type { ApiDefinition } from "@the-stack/backend/api";
import { createTuyau } from "@tuyau/client";

export const apiClient = createTuyau<{ definition: ApiDefinition }>({
	baseUrl: env.NEXT_PUBLIC_API_URL,
});
