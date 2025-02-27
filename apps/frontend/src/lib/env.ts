import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	server: {
		NODE_ENV: z.enum(["development", "production", "test"]),
	},
	client: {},
	// You need to destructure client variables
	experimental__runtimeEnv: {},
});
