import { inject } from "@adonisjs/core";
import type { HttpContext } from "@adonisjs/core/http";
import vine from "@vinejs/vine";
import TokenService from "#services/token_service";

@inject()
export default class ResetPasswordController {
	constructor(protected tokenService: TokenService) {}

	async handle({ request, response }: HttpContext) {
		const { token, password } = await request.validateUsing(validator);

		const isValidToken = await this.tokenService.verify({
			type: "RESET_PASSWORD",
			token,
		});
		if (!isValidToken) {
			return response.unauthorized({ errors: [{ message: "Invalid token" }] });
		}

		const user = await this.tokenService.getUserFromToken({
			type: "RESET_PASSWORD",
			token,
		});
		if (!user) {
			return response.unauthorized({ errors: [{ message: "Invalid token" }] });
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
