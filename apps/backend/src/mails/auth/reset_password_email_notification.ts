import { BaseMail } from "@adonisjs/mail";
import type User from "#models/user";
import env from "#start/env";

export default class ResetPasswordEmailNotification extends BaseMail {
	constructor(
		private user: User,
		private url: string,
		private token: string,
	) {
		super();
	}

	from = env.get("DEFAULT_FROM_EMAIL");
	subject = "Reset your password";

	prepare() {
		this.message
			.to(this.user.email)
			.text(
				`Hello ${this.user.email}, you can reset your password by clicking on the following link: ${this.#url()}`,
			);
	}

	#url() {
		const url = new URL(this.url);
		url.searchParams.set("token", this.token);

		return url.toString();
	}
}
