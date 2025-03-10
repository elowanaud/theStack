import { inject } from "@adonisjs/core";
import type { HttpContext } from "@adonisjs/core/http";
import mail from "@adonisjs/mail/services/main";
import vine from "@vinejs/vine";
import ResetPasswordEmailNotification from "#mails/auth/reset_password_email_notification";
import User from "#models/user";
import ResetPasswordTokenService from "#services/tokens/reset_password_token_service";

@inject()
export default class ForgotPasswordController {
	constructor(protected resetPasswordTokenService: ResetPasswordTokenService) {}

	async handle({ request }: HttpContext) {
		const { email, url } = await request.validateUsing(validator);
		const user = await User.findBy("email", email);
		const token = await this.resetPasswordTokenService.generate(user);

		if (user) {
			await mail.sendLater(
				new ResetPasswordEmailNotification(user, url, token),
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
