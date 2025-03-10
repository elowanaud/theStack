"use client";

import { useResetPassword } from "@/features/auth/reset-password/hooks/useResetPassword";
import {
	type ResetPasswordFormValues,
	useResetPasswordForm,
} from "@/features/auth/reset-password/hooks/useResetPasswordForm";
import { Button } from "@the-stack/ui/components/Button";
import { PasswordField } from "@the-stack/ui/components/PasswordField";
import { useTranslations } from "next-intl";
import { FormProvider, useFormContext } from "react-hook-form";

type ResetPasswordProps = {
	token: string;
};

export function ResetPassword({ token }: ResetPasswordProps) {
	const resetPasswordForm = useResetPasswordForm({
		defaultValues: {
			token,
		},
	});

	return (
		<FormProvider {...resetPasswordForm}>
			<Form />
		</FormProvider>
	);
}

function Form() {
	const t = useTranslations("features.auth.resetPassword");
	const tUser = useTranslations("models.user");
	const {
		handleSubmit,
		register,
		formState: { errors, isSubmitting },
	} = useFormContext<ResetPasswordFormValues>();
	const resetPassword = useResetPassword();

	return (
		<form
			onSubmit={handleSubmit(resetPassword)}
			className="grid w-full gap-4"
			noValidate={true}
		>
			<PasswordField
				label={tUser("newPassword.label")}
				error={
					errors.password && tUser(`password.errors.${errors.password.message}`)
				}
				{...register("password")}
			/>

			<PasswordField
				label={tUser("confirmNewPassword.label")}
				error={
					errors.confirmPassword &&
					tUser(`password.errors.${errors.confirmPassword.message}`)
				}
				{...register("confirmPassword")}
			/>

			<Button type="submit" loading={isSubmitting}>
				{t("resetPassword")}
			</Button>
		</form>
	);
}
