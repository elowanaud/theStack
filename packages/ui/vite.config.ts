import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import preserveDirectives from "rollup-preserve-directives";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
	resolve: {
		alias: {
			"@": resolve(__dirname, "src"),
		},
	},
	build: {
		lib: {
			entry: {
				components: resolve(__dirname, "src/components/index.ts"),
				icons: resolve(__dirname, "src/icons/index.ts"),
			},
			formats: ["es"],
		},
		rollupOptions: {
			external: [
				"react",
				"react-dom",
				"react/jsx-runtime",
				"tailwind-merge",
				"clsx",
				"motion/react",
				"motion/react-m",
			],
			output: {
				globals: {
					react: "React",
					"react-dom": "ReactDOM",
					"react/jsx-runtime": "jsxRuntime",
					"tailwind-merge": "tailwind-merge",
					clsx: "clsx",
					"motion/react": "motion/react",
					"motion/react-m": "motion/react-m",
				},
			},
		},
	},
	plugins: [
		react(),
		tailwindcss(),
		preserveDirectives(),
		dts({
			rollupTypes: true,
			tsconfigPath: resolve(__dirname, "tsconfig.app.json"),
		}),
	],
});
