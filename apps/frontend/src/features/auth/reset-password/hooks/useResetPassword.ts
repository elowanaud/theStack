import type { ResetPasswordFormValues } from "@/features/auth/reset-password/hooks/useResetPasswordForm";
import { useApi } from "@/lib/api/client";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useFormContext } from "react-hook-form";
import { toast } from "sonner";

export function useResetPassword() {
	const t = useTranslations("features.auth.resetPassword");
	const tGlobalError = useTranslations("errors");
	const router = useRouter();
	const { setError } = useFormContext<ResetPasswordFormValues>();

	const action = async (data: ResetPasswordFormValues) => {
		if (data.password !== data.confirmPassword) {
			return setError("confirmPassword", {
				message: "match",
			});
		}

		const { error } = await useApi.auth["reset-password"].$post(data);

		if (error) {
			if (error.status === 422 || error.status === 401) {
				toast.error(tGlobalError("invalidToken"));
			} else {
				toast.error(tGlobalError("somethingWentWrong"));
			}
		} else {
			toast.success(t("toasts.resetPasswordSuccess"));
			router.push("/login");
		}
	};

	return action;
}
