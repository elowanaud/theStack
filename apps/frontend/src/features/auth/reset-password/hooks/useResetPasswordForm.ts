import { userValidator } from "@/validators/user_validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { type UseFormProps, useForm } from "react-hook-form";
import { z } from "zod";

const validator = userValidator
	.pick({
		password: true,
	})
	.merge(
		z.object({
			token: z.string(),
			confirmPassword: z.string(),
		}),
	);

export type ResetPasswordFormValues = z.infer<typeof validator>;

type UseResetPasswordFormProps = Omit<
	UseFormProps<ResetPasswordFormValues>,
	"resolver"
>;

export function useResetPasswordForm(props?: UseResetPasswordFormProps) {
	return useForm<ResetPasswordFormValues>({
		resolver: zodResolver(validator),
		...props,
	});
}
