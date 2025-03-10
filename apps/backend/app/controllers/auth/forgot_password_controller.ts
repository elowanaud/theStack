import { inject } from "@adonisjs/core";
import type { HttpContext } from "@adonisjs/core/http";
import queue from "@rlanz/bull-queue/services/main";
import vine from "@vinejs/vine";
import User from "#models/user";
import ResetPasswordTokenService from "#services/tokens/reset_password_token_service";
import SendResetPasswordEmailJob from "../../jobs/auth/send_reset_password_email_job.js";

@inject()
export default class ForgotPasswordController {
	constructor(protected resetPasswordTokenService: ResetPasswordTokenService) {}

	async handle({ request }: HttpContext) {
		const { email, url } = await request.validateUsing(validator);
		const user = await User.findBy("email", email);
		const token = await this.resetPasswordTokenService.generate(user);

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
	}
}

export const validator = vine.compile(
	vine.object({
		email: vine.string().trim().email(),
		url: vine.string().trim().url({ require_tld: false }),
	}),
);
