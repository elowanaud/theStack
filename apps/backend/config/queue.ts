import { defineConfig } from "@rlanz/bull-queue";
import env from "#start/env";

export default defineConfig({
	defaultConnection: {
		host: env.get("QUEUE_REDIS_HOST"),
		port: env.get("QUEUE_REDIS_PORT"),
		password: env.get("QUEUE_REDIS_PASSWORD"),
	},

	queue: {},

	worker: {},

	jobs: {
		attempts: 3,
		removeOnComplete: 100,
		removeOnFail: 100,
	},
});
