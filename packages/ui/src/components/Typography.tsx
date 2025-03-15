import type { HTMLAttributes, LabelHTMLAttributes } from "react";
import { cn } from "../lib/cn.ts";

export type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
	required?: boolean;
};

export function Label({ required, className, ...props }: LabelProps) {
	const classes = cn(
		"font-medium text-sm",
		{
			" before:pr-0.5 before:text-error-500 before:content-['*']": required,
		},
		className,
	);
	return <label className={classes} {...props} />;
}

export type ErrorTextProps = HTMLAttributes<HTMLSpanElement>;

export function ErrorText({ className, ...props }: ErrorTextProps) {
	const classes = cn("font-medium text-error-500 text-xs", className);

	return <span className={classes} {...props} />;
}

export type HintTextProps = HTMLAttributes<HTMLSpanElement>;

export function HintText({ className, ...props }: HintTextProps) {
	const classes = cn("font-medium text-neutral-500 text-xs", className);

	return <span className={classes} {...props} />;
}
