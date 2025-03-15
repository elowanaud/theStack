"use client";

import { Link } from "@/components/ui/Link/Link";
import { useLogin } from "@/features/auth/login/hooks/useLogin";
import { useLoginForm } from "@/features/auth/login/hooks/useLoginForm";
import { Button } from "@the-stack/ui/components/Button";
import { FormField } from "@the-stack/ui/components/FormField";
import { Input } from "@the-stack/ui/components/Input";
import { Password } from "@the-stack/ui/components/Password";
import { Label } from "@the-stack/ui/components/Typography";
import { useTranslations } from "next-intl";

export function LoginForm() {
	const t = useTranslations("features.auth.login");
	const tUser = useTranslations("models.user");

	const {
		register,
		handleSubmit,
		formState: { isSubmitting },
	} = useLoginForm();
	const login = useLogin();

	return (
		<form
			onSubmit={handleSubmit(login)}
			className="grid w-full gap-4"
			noValidate={true}
		>
			<FormField
				label={tUser("email.label")}
				labelOptions={{ htmlFor: "email" }}
			>
				<Input
					type="email"
					autoComplete="email"
					id="email"
					{...register("email")}
				/>
			</FormField>
			<div className="grid gap-0.5">
				<div className="flex items-baseline justify-between">
					<Label htmlFor="password">{tUser("password.label")}</Label>
					<Link href="/forgot-password" className="text-xs" tabIndex={-1}>
						{t("forgotPassword")}
					</Link>
				</div>
				<Password
					id="password"
					autoComplete="current-password"
					{...register("password")}
				/>
			</div>
			<Button type="submit" loading={isSubmitting}>
				{t("login")}
			</Button>
		</form>
	);
}
