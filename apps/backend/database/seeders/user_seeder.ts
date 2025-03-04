import { createInterface } from "node:readline/promises";
import { BaseSeeder } from "@adonisjs/lucid/seeders";
import { UserFactory } from "#database/factories/user_factory";

export default class extends BaseSeeder {
	async run() {
		const prompt = createInterface({
			input: process.stdin,
			output: process.stdout,
		});

		try {
			const email = await prompt.question("Enter email for your dev email: ");
			const password = await prompt.question(
				"Enter password for your dev email: ",
			);

			if (email && password) {
				await UserFactory.merge({ email, password }).create();
			} else {
				throw new Error("Admin email and password must be provided.");
			}

			await UserFactory.createMany(10);
		} finally {
			prompt.close();
		}
	}
}
