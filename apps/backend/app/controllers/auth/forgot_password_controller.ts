import { inject } from "@adonisjs/core";
import type { HttpContext } from "@adonisjs/core/http";
import vine from "@vinejs/vine";
import User from "#models/user";
import { ResetPasswordTokenService } from "#services/tokens/reset_password_token_service";
import UserValidator from "#validators/user";

@inject()
export default class ForgotPasswordController {
	constructor(protected tokenService: ResetPasswordTokenService) {}

	async handle({ request }: HttpContext) {
		const payload = await request.validateUsing(this.#validator);
		const user = await User.findBy("email", payload.email);
		const token = await this.tokenService.generate(user);

		// send email if user exists
	}

	#validator = vine.compile(
		vine.object({
			email: UserValidator.getProperties().email,
		}),
	);
}
