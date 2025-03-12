import string from "@adonisjs/core/helpers/string";
import logger from "@adonisjs/core/services/logger";
import { DateTime } from "luxon";
import Token from "#models/token";
import type User from "#models/user";

export default class TokenService {
	async generate({ user, type }: { user: User | null; type: Token["type"] }) {
		if (!user) {
			return string.generateRandom(64);
		}

		await this.#deleteOldTokens({ user, type });

		const record = await user.related("tokens").create({
			type,
			token: await this.#generateUniqueToken(),
			expiresAt: DateTime.now().plus({ hours: 1 }),
		});

		return record.token;
	}

	async getUserFromToken({
		token,
		type,
	}: { token: string; type: Token["type"] }) {
		const record = await Token.query()
			.preload("user")
			.where("token", token)
			.where("type", type)
			.where("expires_at", ">", DateTime.now().toSQL())
			.first();

		return record?.user;
	}

	async verify({ token, type }: { token: string; type: Token["type"] }) {
		const record = await Token.query()
			.where("token", token)
			.where("type", type)
			.where("expires_at", ">", DateTime.now().toSQL())
			.first();

		return !!record;
	}

	async #deleteOldTokens({ user, type }: { user: User; type: Token["type"] }) {
		await user.related("tokens").query().where("type", type).delete();
	}

	async #generateUniqueToken() {
		let token = "";
		let isUnique = false;

		while (!isUnique) {
			logger.debug("Generating token");
			token = string.generateRandom(64);
			isUnique = await this.#isUniqueToken(token);
			logger.debug(`isUnique ${isUnique}`);
		}

		return token;
	}

	async #isUniqueToken(token: string) {
		return (await Token.query().where("token", token)).length === 0;
	}
}
