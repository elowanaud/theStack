import { env } from "@/lib/env";
import { ReactScan } from "@/providers/ReactScanProvider";
import type { PropsWithChildren } from "react";

export function Providers({ children }: PropsWithChildren) {
	return (
		<>
			{env.NODE_ENV === "development" && <ReactScan />}
			{children}
		</>
	);
}
