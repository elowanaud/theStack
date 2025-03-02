import { Input } from "@the-stack/ui/components/Input";
import { Password } from "@the-stack/ui/components/Password";
import { useTranslations } from "next-intl";

export default function HomePage() {
	const t = useTranslations();

	return (
		<div>
			<h1>{t("hello")}</h1>
			<Password />
			<Input />
		</div>
	);
}
