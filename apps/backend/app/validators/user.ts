import vine from "@vinejs/vine";

const UserValidator = vine.object({
	email: vine
		.string()
		.trim()
		.email()
		.unique(async (db, value) => {
			const user = await db.from("users").where("email", value).first();

			return !user;
		}),
	password: vine.string().minLength(8).maxLength(256),
});

export default UserValidator;
