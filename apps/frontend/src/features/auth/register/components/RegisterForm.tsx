"use client";
import { useRegister } from "@/features/auth/register/hooks/useRegister";
import {
	type RegisterFormValues,
	useRegisterForm,
} from "@/features/auth/register/hooks/useRegisterForm";
import { Button } from "@the-stack/ui/components/Button";
import { FormField } from "@the-stack/ui/components/FormField";
import { Input } from "@the-stack/ui/components/Input";
import { Password } from "@the-stack/ui/components/Password";
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
			<FormField
				label={tUser("email.label")}
				error={errors.email && tUser(`email.errors.${errors.email.message}`)}
				labelOptions={{ htmlFor: "email" }}
			>
				<Input
					type="email"
					id="email"
					autoComplete="email"
					required={true}
					{...register("email")}
				/>
			</FormField>

			<FormField
				label={tUser("password.label")}
				error={
					errors.password && tUser(`password.errors.${errors.password.message}`)
				}
				labelOptions={{ htmlFor: "password" }}
			>
				<Password
					id="password"
					autoComplete="new-password"
					required={true}
					{...register("password")}
				/>
			</FormField>

			<Button type="submit" loading={isSubmitting}>
				{t("register")}
			</Button>
		</form>
	);
}
