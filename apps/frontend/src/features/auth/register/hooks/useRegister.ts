import type { RegisterFormValues } from "@/features/auth/register/hooks/useRegisterForm";
import { useApi } from "@/lib/api/client";
import { useAuth } from "@/providers/Auth";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useFormContext } from "react-hook-form";
import { toast } from "sonner";

export function useRegister() {
	const t = useTranslations("features.auth.register");
	const tGlobalError = useTranslations("errors");
	const router = useRouter();
	const { setCurrentUser } = useAuth((state) => state);
	const { setError } = useFormContext<RegisterFormValues>();

	const action = async (data: RegisterFormValues) => {
		const { data: user, error } = await useApi.auth.register.$post(data);

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
			setCurrentUser(user);
			toast.success(t("toasts.registerSuccess"));
			router.push("/");
		}
	};

	return action;
}
