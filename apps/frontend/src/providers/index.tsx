import { env } from "@/lib/env";
import { I18nProvider } from "@/providers/I18n";
import { NuqsProvider } from "@/providers/Nuqs";
import { ReactScanProvider } from "@/providers/ReactScan";
import type { PropsWithChildren } from "react";

export function Providers({ children }: PropsWithChildren) {
	return (
		<>
			{env.NODE_ENV === "development" && <ReactScanProvider />}
			<I18nProvider>
				<NuqsProvider>{children}</NuqsProvider>
			</I18nProvider>
		</>
	);
}
