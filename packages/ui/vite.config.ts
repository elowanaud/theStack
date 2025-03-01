import { readdirSync, renameSync, rmSync } from "node:fs";
import { resolve } from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import preserveDirectives from "rollup-preserve-directives";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

const path = resolve(__dirname, "src/components");
const fileNames = readdirSync(path);
const componentEntries = Object.fromEntries(
	fileNames.map((fileName) => {
		return [
			`components/${fileName}`,
			resolve(path, fileName, `${fileName}.tsx`),
		];
	}),
);

export default defineConfig({
	resolve: {
		alias: {
			"@": resolve(__dirname, "src"),
		},
	},
	build: {
		outDir: "./dist",
		lib: {
			entry: {
				...componentEntries,
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
			outDir: ["./dist/components"],
			afterBuild() {
				rmSync(resolve(__dirname, "dist/components/components"), {
					recursive: true,
					force: true,
				});
				renameSync(
					resolve(__dirname, "dist/components/icons.d.ts"),
					resolve(__dirname, "dist/icons.d.ts"),
				);
			},
		}),
	],
});
