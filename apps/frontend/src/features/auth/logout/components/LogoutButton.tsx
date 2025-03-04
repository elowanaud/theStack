"use client";

import { useLogout } from "@/features/auth/logout/hook/useLogout";
import { Button } from "@the-stack/ui/components/Button";
import { useTranslations } from "next-intl";

export function LogoutButton() {
	const t = useTranslations("features.auth.logout");

	const { handleClick, isLoading } = useLogout();

	return (
		<Button onClick={handleClick} loading={isLoading}>
			{t("logout")}
		</Button>
	);
}
