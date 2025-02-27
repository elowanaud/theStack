import { QueryClient, isServer } from "@tanstack/react-query";

let browserQueryClient: QueryClient | undefined;

export function getQueryClient() {
	if (isServer) {
		return createQueryClient();
	}

	if (!browserQueryClient) {
		browserQueryClient = createQueryClient();
	}

	return browserQueryClient;
}

function createQueryClient() {
	return new QueryClient();
}
