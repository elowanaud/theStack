import { z } from "zod";

export const userValidator = z.object({
	email: z.string().email(),
	password: z.string().min(8).max(32),
});
