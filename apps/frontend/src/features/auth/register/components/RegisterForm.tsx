"use client";

import { useRegister } from "@/features/auth/register/hooks/useRegister";
import { Button } from "@the-stack/ui/components/Button";
import { InputField } from "@the-stack/ui/components/InputField";
import { PasswordField } from "@the-stack/ui/components/PasswordField";

export function RegisterForm() {
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
				label="Email"
				error={errors.email?.message}
				autoComplete="email"
				{...register("email")}
			/>
			<PasswordField
				label="Password"
				error={errors.password?.message}
				autoComplete="current-password"
				{...register("password")}
			/>
			<Button type="submit" loading={isSubmitting}>
				Register
			</Button>
		</form>
	);
}
