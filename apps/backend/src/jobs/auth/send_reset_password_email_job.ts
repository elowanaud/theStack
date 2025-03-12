import mail from "@adonisjs/mail/services/main";
import { Job } from "@rlanz/bull-queue";
import ResetPasswordEmailNotification from "#mails/auth/reset_password_email_notification";
import User from "#models/user";

interface SendResetPasswordEmailJobPayload {
	user: User;
	url: string;
	token: string;
}

export default class SendResetPasswordEmailJob extends Job {
	static get $$filepath() {
		return import.meta.url;
	}

	async handle({ user, url, token }: SendResetPasswordEmailJobPayload) {
		await mail.send(new ResetPasswordEmailNotification(user, url, token));
	}

	async rescue(_payload: SendResetPasswordEmailJobPayload) {
		return;
	}
}
