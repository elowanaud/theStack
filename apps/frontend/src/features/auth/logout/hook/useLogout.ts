import { useApi } from "@/lib/api/client";
import { useAuth } from "@/providers/Auth";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function useLogout() {
	const [isLoading, setIsLoading] = useState(false);

	const t = useTranslations("features.auth.logout");
	const tGlobalError = useTranslations("errors");
	const router = useRouter();
	const { removeCurrentUser } = useAuth((state) => state);

	const handleClick = async () => {
		setIsLoading(true);
		router.prefetch("/login");
		const { error } = await useApi.auth.logout.$delete();

		if (error) {
			toast.error(tGlobalError("somethingWentWrong"));
		} else {
			removeCurrentUser();
			toast.success(t("toasts.logoutSuccess"));
			router.push("/login");
		}
		setIsLoading(false);
	};

	return {
		handleClick,
		isLoading,
	};
}
