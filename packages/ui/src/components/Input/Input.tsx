import { cn } from "@/lib/cn";
import type { Prettify } from "@/types";
import type { InputHTMLAttributes } from "react";

export type InputProps = Prettify<
	InputHTMLAttributes<HTMLInputElement> & {
		type: "text" | "email" | "number" | "url";
	}
>;

export function Input({ className, ...props }: InputProps) {
	const classes = cn(
		[
			"h-9 rounded-md border border-neutral-300 bg-white px-3 py-1.5 text-neutral-950 text-sm transition-colors",
			"placeholder:text-neutral-400",
			"focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-500",
			"disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:opacity-50",
		],
		className,
	);

	return <input className={classes} {...props} />;
}
