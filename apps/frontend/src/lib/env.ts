import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	server: {
		NODE_ENV: z.enum(["development", "production", "test"]),
	},
	client: {
		NEXT_PUBLIC_API_URL: z.string().url(),
	},
	// You need to destructure client variables
	experimental__runtimeEnv: {
		// biome-ignore lint/nursery/noProcessEnv: <explanation>
		NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
	},
});
