import { inject } from "@adonisjs/core";
import type { HttpContext } from "@adonisjs/core/http";
import vine from "@vinejs/vine";
import { ResetPasswordTokenService } from "#services/tokens/reset_password_token_service";

@inject()
export default class ResetPasswordController {
	constructor(protected tokenService: ResetPasswordTokenService) {}

	async handle({ request, response }: HttpContext) {
		const { token, password } = await request.validateUsing(validator);

		const isValidToken = await this.tokenService.verify(token);
		if (!isValidToken) {
			return response.unauthorized();
		}

		const user = await this.tokenService.getUserFromToken(token);
		if (!user) {
			return response.unauthorized();
		}

		await user
			.merge({
				password,
			})
			.save();
	}
}

export const validator = vine.compile(
	vine.object({
		token: vine.string(),
		password: vine.string(),
	}),
);
