import type User from "#models/user";

export class UserPresenter {
	toJSON(user: User) {
		return {
			id: user.id,
			email: user.email,
			createdAt: user.createdAt.toJSDate(),
			updatedAt: user.updatedAt?.toJSDate(),
		};
	}
}
