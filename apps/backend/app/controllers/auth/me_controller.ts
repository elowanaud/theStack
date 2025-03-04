import { inject } from "@adonisjs/core";
import type { HttpContext } from "@adonisjs/core/http";
import { UserPresenter } from "#presenters/user_presenter";

@inject()
export default class MeController {
	constructor(protected presenter: UserPresenter) {}

	async handle({ auth }: HttpContext) {
		if (await auth.check()) {
			return this.presenter.toJSON(auth.user!);
		}

		return null;
	}
}
