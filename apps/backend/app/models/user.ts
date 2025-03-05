import { withAuthFinder } from "@adonisjs/auth/mixins/lucid";
import { compose } from "@adonisjs/core/helpers";
import hash from "@adonisjs/core/services/hash";
import { BaseModel, column, hasMany } from "@adonisjs/lucid/orm";
import type { HasMany } from "@adonisjs/lucid/types/relations";
import type { DateTime } from "luxon";
import Token from "#models/token";

const AuthFinder = withAuthFinder(() => hash.use("scrypt"), {
	uids: ["email"],
	passwordColumnName: "password",
});

export default class User extends compose(BaseModel, AuthFinder) {
	@column({ isPrimary: true })
	declare id: number;

	@column()
	declare fullName: string | null;

	@column()
	declare email: string;

	@column({ serializeAs: null })
	declare password: string;

	@column.dateTime({ autoCreate: true })
	declare createdAt: DateTime;

	@column.dateTime({ autoCreate: true, autoUpdate: true })
	declare updatedAt: DateTime | null;

	@hasMany(() => Token)
	declare tokens: HasMany<typeof Token>;

	@hasMany(() => Token, {
		onQuery: (db) => db.where("type", "RESET_PASSWORD"),
	})
	declare resetPasswordTokens: HasMany<typeof Token>;
}
