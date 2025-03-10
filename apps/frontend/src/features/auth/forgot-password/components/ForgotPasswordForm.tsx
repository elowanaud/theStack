"use client";

import { useForgotPassword } from "@/features/auth/forgot-password/hooks/useForgotPassword";
import {
	type ForgotPasswordFormValues,
	useForgotPasswordForm,
} from "@/features/auth/forgot-password/hooks/useForgotPasswordForm";
import { Button } from "@the-stack/ui/components/Button";
import { InputField } from "@the-stack/ui/components/InputField";
import { useTranslations } from "next-intl";
import { FormProvider, useFormContext } from "react-hook-form";

export function ForgotPasswordForm() {
	const forgotPasswordForm = useForgotPasswordForm();

	return (
		<FormProvider {...forgotPasswordForm}>
			<Form />
		</FormProvider>
	);
}

function Form() {
	const t = useTranslations("features.auth.forgotPassword");
	const tUser = useTranslations("models.user");
	const {
		register,
		handleSubmit,
		formState: { isSubmitting, errors },
	} = useFormContext<ForgotPasswordFormValues>();
	const sendInstructions = useForgotPassword();

	return (
		<form
			onSubmit={handleSubmit(sendInstructions)}
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

			<Button type="submit" loading={isSubmitting}>
				{t("sendInstructions")}
			</Button>
		</form>
	);
}
