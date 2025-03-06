import { useApi } from "@/lib/api/client";
import { env } from "@/lib/env";
import { userValidator } from "@/validators/user_validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

export function useForgotPassword() {
	const t = useTranslations("features.auth.forgotPassword");
	const tGlobalError = useTranslations("errors");
	const {
		register,
		handleSubmit,
		setError,
		formState: { isSubmitting, errors },
	} = useForm({
		resolver: zodResolver(validator),
	});
	const router = useRouter();

	const onSubmit = async (data: z.infer<typeof validator>) => {
		const { error } = await useApi.auth["forgot-password"].$post({
			url: `${env.NEXT_PUBLIC_FRONTEND_URL}/reset-password`,
			...data,
		});

		if (error) {
			if (error.status === 422) {
				for (const fieldError of error.value.errors) {
					setError(fieldError.field as keyof typeof data, {
						message: fieldError.rule,
					});
				}
			} else {
				toast.error(tGlobalError("somethingWentWrong"));
			}
		} else {
			router.push("/login");
			toast.success(t("toasts.forgotPasswordSuccess"));
		}
	};

	return {
		register,
		errors,
		isSubmitting,
		handleSubmit,
		onSubmit,
	};
}

const validator = userValidator.pick({
	email: true,
});
