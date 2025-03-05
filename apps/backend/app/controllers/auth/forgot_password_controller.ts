import { inject } from "@adonisjs/core";
import type { HttpContext } from "@adonisjs/core/http";
import mail from "@adonisjs/mail/services/main";
import vine from "@vinejs/vine";
import User from "#models/user";
import { ResetPasswordTokenService } from "#services/tokens/reset_password_token_service";
import env from "#start/env";

@inject()
export default class ForgotPasswordController {
	constructor(protected tokenService: ResetPasswordTokenService) {}

	async handle({ request }: HttpContext) {
		const payload = await request.validateUsing(validator);
		const user = await User.findBy("email", payload.email);
		const token = await this.tokenService.generate(user);

		if (user) {
			await mail.sendLater((message) => {
				message
					.to(user.email)
					.subject("Reset your password")
					.text(
						`Hello ${user.email}, you can reset your password by clicking on the following link: ${env.get("FRONTEND_URL")}/reset-password?token=${token}`,
					);
			});
		}
	}
}

export const validator = vine.compile(
	vine.object({
		email: vine.string().trim().email(),
	}),
);
