import { inject } from "@adonisjs/core";
import type { HttpContext } from "@adonisjs/core/http";
import vine from "@vinejs/vine";
import User from "#models/user";
import { UserPresenter } from "#presenters/user_presenter";
import UserValidator from "#validators/user";

@inject()
export default class RegisterController {
	constructor(protected presenter: UserPresenter) {}

	async handle({ request, auth }: HttpContext) {
		const payload = await request.validateUsing(validator);
		const user = await User.create(payload);
		await auth.use("web").login(user);

		return this.presenter.toJSON(user);
	}
}

export const validator = vine.compile(
	vine.object({
		email: UserValidator.getProperties().email,
		password: UserValidator.getProperties().password,
	}),
);
