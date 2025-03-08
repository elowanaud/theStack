import { userValidator } from "@/validators/user_validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { type UseFormProps, useForm } from "react-hook-form";
import type { z } from "zod";

const validator = userValidator.pick({
	email: true,
});

export type ForgotPasswordFormValues = z.infer<typeof validator>;

type UseForgotPasswordFormProps = Omit<
	UseFormProps<ForgotPasswordFormValues>,
	"resolver"
>;

export function useForgotPasswordForm(props?: UseForgotPasswordFormProps) {
	return useForm<ForgotPasswordFormValues>({
		resolver: zodResolver(validator),
		...props,
	});
}
