import { Link } from "@/components/ui/Link/Link";
import { RegisterForm } from "@/features/auth/register/components/RegisterForm";
import { useTranslations } from "next-intl";

export default function RegisterPage() {
	const t = useTranslations("app.register");

	return (
		<main className="flex min-h-screen items-center justify-center">
			<div className="grid w-full max-w-sm gap-6 p-4">
				<div className="grid gap-1">
					<h1 className="font-bold text-2xl text-neutral-950">{t("title")}</h1>
					<p className="text-neutral-500 text-sm">
						{t("alreadyHaveAccount")} <Link href="/login">{t("login")}</Link>
					</p>
				</div>
				<RegisterForm />
			</div>
		</main>
	);
}
