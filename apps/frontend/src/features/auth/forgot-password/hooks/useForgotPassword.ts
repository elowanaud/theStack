import type { ForgotPasswordFormValues } from "@/features/auth/forgot-password/hooks/useForgotPasswordForm";
import { useApi } from "@/lib/api/client";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useFormContext } from "react-hook-form";
import { toast } from "sonner";

export function useForgotPassword() {
	const t = useTranslations("features.auth.forgotPassword");
	const tGlobalError = useTranslations("errors");
	const router = useRouter();
	const { setError } = useFormContext<ForgotPasswordFormValues>();

	const action = async (data: ForgotPasswordFormValues) => {
		const { error } = await useApi.auth["forgot-password"].$post({
			url: `${window.location.origin}/reset-password`,
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
			toast.success(t("toasts.forgotPasswordSuccess"));
			router.push("/login");
		}
	};

	return action;
}
