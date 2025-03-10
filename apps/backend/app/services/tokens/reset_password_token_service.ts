import string from "@adonisjs/core/helpers/string";
import { DateTime } from "luxon";
import Token from "#models/token";
import type User from "#models/user";

export default class ResetPasswordTokenService {
	async generate(user: User | null) {
		const token = string.generateRandom(64);

		if (!user) {
			return token;
		}

		await this.#deleteOldTokens(user);

		const record = await user.related("tokens").create({
			type: "RESET_PASSWORD",
			token,
			expiresAt: DateTime.now().plus({ hours: 1 }),
		});

		return record.token;
	}

	async getUserFromToken(token: string) {
		const record = await Token.query()
			.preload("user")
			.where("type", "RESET_PASSWORD")
			.where("token", token)
			.where("expires_at", ">", DateTime.now().toSQL())
			.first();

		return record?.user;
	}

	async verify(token: string) {
		const record = await Token.query()
			.where("type", "RESET_PASSWORD")
			.where("token", token)
			.where("expires_at", ">", DateTime.now().toSQL())
			.first();

		return !!record;
	}

	async #deleteOldTokens(user: User) {
		await user.related("tokens").query().delete();
	}
}
