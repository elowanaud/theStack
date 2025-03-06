import { useApi } from "@/lib/api/client";
import { useAuth } from "@/providers/Auth";
import { userValidator } from "@/validators/user_validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

export function useRegister() {
	const t = useTranslations("features.auth.register");
	const tGlobalError = useTranslations("errors");
	const router = useRouter();
	const { setCurrentUser } = useAuth((state) => state);
	const {
		register,
		formState: { isSubmitting, errors },
		setError,
		handleSubmit,
	} = useForm({
		resolver: zodResolver(validator),
	});

	const onSubmit = async (data: z.infer<typeof validator>) => {
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
			router.push("/");
			toast.success(t("toasts.registerSuccess"));
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
	password: true,
});
