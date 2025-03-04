import { z } from "zod";

export const userValidator = z.object({
	email: z.string().email("email"),
	password: z.string().min(8, "min").max(32, "max"),
});
