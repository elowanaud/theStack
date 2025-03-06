"use client";

import { useForgotPassword } from "@/features/auth/forgot-password/hooks/useForgotPassword";
import { Button } from "@the-stack/ui/components/Button";
import { InputField } from "@the-stack/ui/components/InputField";
import { useTranslations } from "next-intl";

export function ForgotPasswordForm() {
	const t = useTranslations("features.auth.forgotPassword");
	const tUser = useTranslations("models.user");
	const { errors, register, handleSubmit, isSubmitting, onSubmit } =
		useForgotPassword();

	return (
		<form
			className="grid w-full gap-4"
			onSubmit={handleSubmit(onSubmit)}
			noValidate={true}
		>
			<InputField
				type="email"
				label={tUser("email.label")}
				error={errors.email && tUser(`email.errors.${errors.email.message}`)}
				autoComplete="email"
				{...register("email")}
			/>

			<Button type="submit" loading={isSubmitting}>
				{t("sendInstructions")}
			</Button>
		</form>
	);
}
