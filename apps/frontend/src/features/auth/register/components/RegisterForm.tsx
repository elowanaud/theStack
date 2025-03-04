"use client";

import { useRegister } from "@/features/auth/register/hooks/useRegister";
import { Button } from "@the-stack/ui/components/Button";
import { InputField } from "@the-stack/ui/components/InputField";
import { PasswordField } from "@the-stack/ui/components/PasswordField";
import { useTranslations } from "next-intl";

export function RegisterForm() {
	const t = useTranslations("features.auth.register");
	const tUser = useTranslations("models.user");

	const { register, isSubmitting, errors, handleSubmit, onSubmit } =
		useRegister();

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="grid w-full gap-4"
			noValidate={true}
		>
			<InputField
				type="email"
				label={tUser("email.label")}
				error={errors.email && tUser(`email.errors.${errors.email.message}`)}
				autoComplete="email"
				{...register("email")}
			/>
			<PasswordField
				label={tUser("password.label")}
				error={
					errors.password && tUser(`password.errors.${errors.password.message}`)
				}
				autoComplete="current-password"
				{...register("password")}
			/>
			<Button type="submit" loading={isSubmitting}>
				{t("register")}
			</Button>
		</form>
	);
}
