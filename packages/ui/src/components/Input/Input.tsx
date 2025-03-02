import { cn } from "@/lib/cn";
import type { InputHTMLAttributes, Ref } from "react";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
	ref?: Ref<HTMLInputElement>;
};

export function Input({ className, ref, ...props }: InputProps) {
	const classes = cn(
		[
			"h-9 w-full rounded-md border border-neutral-300 bg-white px-3 text-neutral-950 text-sm transition-colors",
			"placeholder:text-neutral-400",
			"focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-500",
			"disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:opacity-50",
		],
		className,
	);

	return <input ref={ref} className={classes} {...props} />;
}
