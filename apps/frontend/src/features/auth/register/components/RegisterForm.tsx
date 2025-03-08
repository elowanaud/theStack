"use client";
import { useRegister } from "@/features/auth/register/hooks/useRegister";
import {
	type RegisterFormValues,
	useRegisterForm,
} from "@/features/auth/register/hooks/useRegisterForm";
import { Button } from "@the-stack/ui/components/Button";
import { InputField } from "@the-stack/ui/components/InputField";
import { PasswordField } from "@the-stack/ui/components/PasswordField";
import { useTranslations } from "next-intl";
import { FormProvider, useFormContext } from "react-hook-form";

export function RegisterForm() {
	const registerForm = useRegisterForm();

	return (
		<FormProvider {...registerForm}>
			<Form />
		</FormProvider>
	);
}

function Form() {
	const t = useTranslations("features.auth.register");
	const tUser = useTranslations("models.user");
	const {
		register,
		handleSubmit,
		formState: { isSubmitting, errors },
	} = useFormContext<RegisterFormValues>();
	const signUp = useRegister();

	return (
		<form
			onSubmit={handleSubmit(signUp)}
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
