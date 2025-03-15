"use client";

import { useResetPassword } from "@/features/auth/reset-password/hooks/useResetPassword";
import {
	type ResetPasswordFormValues,
	useResetPasswordForm,
} from "@/features/auth/reset-password/hooks/useResetPasswordForm";
import { Button } from "@the-stack/ui/components/Button";
import { FormField } from "@the-stack/ui/components/FormField";
import { Password } from "@the-stack/ui/components/Password";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { FormProvider, useFormContext } from "react-hook-form";

export function ResetPassword() {
	const searchParams = useSearchParams();
	const resetPasswordForm = useResetPasswordForm({
		defaultValues: {
			token: searchParams.get("token") ?? "",
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
			<FormField
				label={tUser("newPassword.label")}
				error={
					errors.password && tUser(`password.errors.${errors.password.message}`)
				}
				labelOptions={{ htmlFor: "password" }}
			>
				<Password
					id="password"
					autoComplete="new-password"
					{...register("password")}
				/>
			</FormField>

			<FormField
				label={tUser("confirmNewPassword.label")}
				error={
					errors.confirmPassword &&
					tUser(`password.errors.${errors.confirmPassword.message}`)
				}
				labelOptions={{ htmlFor: "confirmPassword" }}
			>
				<Password
					id="confirmPassword"
					autoComplete="new-password"
					{...register("confirmPassword")}
				/>
			</FormField>

			<Button type="submit" loading={isSubmitting}>
				{t("resetPassword")}
			</Button>
		</form>
	);
}
