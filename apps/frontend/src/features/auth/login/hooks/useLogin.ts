import { useApi } from "@/lib/api/client";
import { useAuth } from "@/providers/Auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export function useLogin() {
	const t = useTranslations("features.auth.login");
	const tGlobalError = useTranslations("errors");
	const router = useRouter();
	const { setCurrentUser } = useAuth((state) => state);
	const {
		register,
		formState: { isSubmitting },
		handleSubmit,
	} = useForm({
		resolver: zodResolver(validator),
	});

	const onSubmit = async (data: z.infer<typeof validator>) => {
		router.prefetch("/");
		const { data: user, error } = await useApi.auth.login.$post(data);

		if (error) {
			if (error.status === 500) {
				toast.error(tGlobalError("somethingWentWrong"));
			} else {
				toast.error(tGlobalError("invalidCredentials"));
			}
		} else {
			setCurrentUser(user);
			router.push("/");
			toast.success(t("toasts.loginSuccess"));
		}
	};

	return {
		register,
		isSubmitting,
		handleSubmit,
		onSubmit,
	};
}

const validator = z.object({
	email: z.string(),
	password: z.string(),
});
