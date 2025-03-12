import { inject } from "@adonisjs/core";
import type { HttpContext } from "@adonisjs/core/http";
import queue from "@rlanz/bull-queue/services/main";
import vine from "@vinejs/vine";
import SendResetPasswordEmailJob from "#jobs/auth/send_reset_password_email_job";
import User from "#models/user";
import TokenService from "#services/token_service";

@inject()
export default class ForgotPasswordController {
	constructor(protected tokenService: TokenService) {}

	async handle({ request }: HttpContext) {
		const { email, url } = await request.validateUsing(validator);
		const user = await User.findBy("email", email);
		const token = await this.tokenService.generate({
			user,
			type: "RESET_PASSWORD",
		});

		if (user) {
			queue.dispatch(
				SendResetPasswordEmailJob,
				{
					user,
					url,
					token,
				},
				{
					queueName: "email",
				},
			);
		}

		return {
			token,
		};
	}
}

export const validator = vine.compile(
	vine.object({
		email: vine.string().trim().email(),
		url: vine.string().trim().url({ require_tld: false }),
	}),
);
