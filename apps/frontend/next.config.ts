import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
	output: "standalone",
	transpilePackages: ["@t3-oss/env-nextjs", "@t3-oss/env-core"],
};

const withNextIntl = createNextIntlPlugin("./src/lib/i18n.ts");
export default withNextIntl(nextConfig);
