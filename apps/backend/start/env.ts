import { Env } from "@adonisjs/core/env";

export default await Env.create(new URL("../", import.meta.url), {
	// Environment variables
	NODE_ENV: Env.schema.enum(["development", "production", "test"] as const),
	PORT: Env.schema.number(),
	APP_KEY: Env.schema.string(),
	HOST: Env.schema.string({ format: "host" }),
	LOG_LEVEL: Env.schema.enum([
		"fatal",
		"error",
		"warn",
		"info",
		"debug",
		"trace",
	]),

	// Database connection
	DB_HOST: Env.schema.string({ format: "host" }),
	DB_PORT: Env.schema.number(),
	DB_USER: Env.schema.string(),
	DB_PASSWORD: Env.schema.string.optional(),
	DB_DATABASE: Env.schema.string(),

	// Session
	SESSION_DRIVER: Env.schema.enum(["cookie", "memory"] as const),

	// Mailing
	RESEND_API_KEY: Env.schema.string(),
	DEFAULT_FROM_EMAIL: Env.schema.string({ format: "email" }),

	// Queue
	QUEUE_REDIS_HOST: Env.schema.string({ format: "host" }),
	QUEUE_REDIS_PORT: Env.schema.number(),
	QUEUE_REDIS_PASSWORD: Env.schema.string.optional(),
});
