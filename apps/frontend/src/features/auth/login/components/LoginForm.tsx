"use client";

import { useLogin } from "@/features/auth/login/hooks/useLogin";
import { Button } from "@the-stack/ui/components/Button";
import { InputField } from "@the-stack/ui/components/InputField";
import { PasswordField } from "@the-stack/ui/components/PasswordField";

export function LoginForm() {
	const { register, isSubmitting, handleSubmit, onSubmit } = useLogin();

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="grid w-full gap-4"
			noValidate={true}
		>
			<InputField
				type="email"
				label="Email"
				autoComplete="email"
				{...register("email")}
			/>
			<PasswordField
				label="Password"
				autoComplete="current-password"
				{...register("password")}
			/>
			<Button type="submit" loading={isSubmitting}>
				Login
			</Button>
		</form>
	);
}
