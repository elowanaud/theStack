import fs from "node:fs";
import path from "node:path";
import merge from "deepmerge-json";
import { getRequestConfig } from "next-intl/server";
import { headers } from "next/headers";

const availableLocales = ["en", "fr"] as const;
const defaultLocale = "en" as const;

export default getRequestConfig(async () => {
	const locale = await _getLocale();
	const messages = _loadI18nTranslations("./locales", locale);

	return {
		locale,
		messages: messages,
	};
});

const _getLocale = async () => {
	const headersList = await headers();
	const acceptLanguage = headersList.get("accept-language");
	const userPreferredLanguage = acceptLanguage?.split(",")[0]?.split("-")[0];
	if (
		userPreferredLanguage &&
		availableLocales.includes(
			userPreferredLanguage as (typeof availableLocales)[number],
		)
	) {
		return userPreferredLanguage;
	}

	return defaultLocale;
};

const _loadI18nTranslations = (dictionariesPath: string, locale: string) => {
	const absolutePath = path.join(process.cwd(), dictionariesPath);

	let translations = {};

	try {
		const files = fs.readdirSync(absolutePath, { recursive: true });

		for (const file of files) {
			if (typeof file === "string" && file.endsWith(`${locale}.json`)) {
				const filePath = path.join(absolutePath, file);
				const fileTranslations = JSON.parse(fs.readFileSync(filePath, "utf-8"));

				translations = merge(translations, fileTranslations);
			}
		}
	} catch (error) {
		throw new Error(
			`Error loading translations for locale ${locale}: ${error}`,
		);
	}

	return translations;
};
