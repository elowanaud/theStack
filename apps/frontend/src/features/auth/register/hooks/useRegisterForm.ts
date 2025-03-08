import { userValidator } from "@/validators/user_validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { type UseFormProps, useForm } from "react-hook-form";
import type { z } from "zod";

const validator = userValidator.pick({
	email: true,
	password: true,
});

export type RegisterFormValues = z.infer<typeof validator>;

type UseRegisterFormProps = Omit<UseFormProps<RegisterFormValues>, "resolver">;

export function useRegisterForm(props?: UseRegisterFormProps) {
	return useForm<RegisterFormValues>({
		resolver: zodResolver(validator),
		...props,
	});
}
