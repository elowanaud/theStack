import type { LoginFormValues } from "@/features/auth/login/hooks/useLoginForm";
import { useApi } from "@/lib/api/client";
import { useAuth } from "@/providers/Auth";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function useLogin() {
	const t = useTranslations("features.auth.login");
	const tGlobalError = useTranslations("errors");
	const router = useRouter();
	const { setCurrentUser } = useAuth((state) => state);

	const action = async (data: LoginFormValues) => {
		const { data: user, error } = await useApi.auth.login.$post(data);

		if (error) {
			if (error.status === 500) {
				toast.error(tGlobalError("somethingWentWrong"));
			} else {
				toast.error(tGlobalError("invalidCredentials"));
			}
		} else {
			setCurrentUser(user);
			toast.success(t("toasts.loginSuccess"));
			router.push("/");
		}
	};

	return action;
}
