import { ResetPassword } from "@/features/auth/reset-password/components/ResetPassword";
import { useTranslations } from "next-intl";

export default function ResetPasswordPage() {
	const t = useTranslations("app.resetPassword");

	return (
		<main className="flex min-h-screen items-center justify-center">
			<div className="grid w-full max-w-sm gap-6 p-4">
				<div className="grid gap-1">
					<h1 className="font-bold text-2xl text-neutral-950">{t("title")}</h1>
					<p className="text-neutral-500 text-sm">{t("description")}</p>
				</div>
				<ResetPassword />
			</div>
		</main>
	);
}
