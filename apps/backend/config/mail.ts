import { defineConfig, transports } from "@adonisjs/mail";
import env from "#start/env";

const mailConfig = defineConfig({
	default: "resend",

	from: {
		name: "The Stack",
		address: env.get("DEFAULT_FROM_EMAIL"),
	},

	mailers: {
		resend: transports.resend({
			key: env.get("RESEND_API_KEY"),
			baseUrl: "https://api.resend.com",
		}),
	},
});

export default mailConfig;

declare module "@adonisjs/mail/types" {
	export interface MailersList extends InferMailers<typeof mailConfig> {}
}
