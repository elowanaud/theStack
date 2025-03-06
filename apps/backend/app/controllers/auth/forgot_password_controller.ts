import { inject } from "@adonisjs/core";
import type { HttpContext } from "@adonisjs/core/http";
import mail from "@adonisjs/mail/services/main";
import vine from "@vinejs/vine";
import User from "#models/user";
import { ResetPasswordTokenService } from "#services/tokens/reset_password_token_service";

@inject()
export default class ForgotPasswordController {
	constructor(protected resetPasswordTokenService: ResetPasswordTokenService) {}

	async handle({ request }: HttpContext) {
		const { email, url } = await request.validateUsing(validator);
		const user = await User.findBy("email", email);
		const token = await this.resetPasswordTokenService.generate(user);
		const resetPasswordLink = new URL(url);
		resetPasswordLink.searchParams.set("token", token);

		if (user) {
			await mail.sendLater((message) => {
				message
					.to(user.email)
					.subject("Reset your password")
					.text(
						`Hello ${user.email}, you can reset your password by clicking on the following link: ${resetPasswordLink}`,
					);
			});
		}
	}
}

export const validator = vine.compile(
	vine.object({
		email: vine.string().trim().email(),
		url: vine.string().trim().url({ require_tld: false }),
	}),
);
