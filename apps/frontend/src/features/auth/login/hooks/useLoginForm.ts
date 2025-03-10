import { zodResolver } from "@hookform/resolvers/zod";
import { type UseFormProps, useForm } from "react-hook-form";
import { z } from "zod";

const validator = z.object({
	email: z.string(),
	password: z.string(),
});

export type LoginFormValues = z.infer<typeof validator>;

type UseLoginFormProps = Omit<UseFormProps<LoginFormValues>, "resolver">;

export function useLoginForm(props?: UseLoginFormProps) {
	return useForm<LoginFormValues>({
		resolver: zodResolver(validator),
		...props,
	});
}
