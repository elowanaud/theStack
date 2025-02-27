import { env } from "@/lib/env";
import { ReactScanProvider } from "@/providers/ReactScan";
import type { PropsWithChildren } from "react";

export function Providers({ children }: PropsWithChildren) {
	return (
		<>
			{env.NODE_ENV === "development" && <ReactScanProvider />}
			{children}
		</>
	);
}
