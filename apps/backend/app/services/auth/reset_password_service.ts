import string from "@adonisjs/core/helpers/string";
import { DateTime } from "luxon";
import Token from "#models/token";
import type User from "#models/user";

export class ResetPasswordService {
	async generateToken(user: User) {
		const token = string.generateRandom(64);

		await this.#deleteOldTokens(user);

		const record = await user.related("tokens").create({
			type: "RESET_PASSWORD",
			token,
			expiresAt: DateTime.now().plus({ hours: 1 }),
		});

		return record.token;
	}

	async verify(user: User, token: string) {
		const record = await Token.query()
			.where("type", "RESET_PASSWORD")
			.where("user_id", user.id)
			.where("token", token)
			.where("expires_at", ">", DateTime.now().toSQL())
			.first();

		return !!record;
	}

	async #deleteOldTokens(user: User) {
		await user.related("tokens").query().delete();
	}
}
