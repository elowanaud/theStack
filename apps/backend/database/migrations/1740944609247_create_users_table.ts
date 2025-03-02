import { BaseSchema } from "@adonisjs/lucid/schema";

export default class extends BaseSchema {
	protected tableName = "users";

	async up() {
		await this.schema.createTable(this.tableName, (table) => {
			table.increments("id").notNullable();
			table.string("full_name").nullable();
			table.string("email", 254).notNullable().unique();
			table.string("password").notNullable();

			table.timestamp("created_at").notNullable();
			table.timestamp("updated_at").nullable();
		});
	}

	async down() {
		await this.schema.dropTable(this.tableName);
	}
}
