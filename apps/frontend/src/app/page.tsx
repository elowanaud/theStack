import { Button } from "@the-stack/ui/components";
import { LoaderIcon } from "@the-stack/ui/icons";
import { useTranslations } from "next-intl";

export default function HomePage() {
	const t = useTranslations();

	return (
		<div>
			<h1>{t("hello")}</h1>
			<Button>
				Click me <LoaderIcon />
			</Button>
		</div>
	);
}
