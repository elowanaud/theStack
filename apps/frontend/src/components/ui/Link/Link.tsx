import { cn } from "@/lib/cn";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import type { PropsWithChildren } from "react";

export type LinkProps = PropsWithChildren &
	NextLinkProps & {
		className?: string;
		tabIndex?: number;
	};

export function Link({ className, ...props }: LinkProps) {
	const classes = cn(
		[
			"font-medium text-primary-500 text-sm underline transition-colors",
			"hover:text-primary-700",
		],
		className,
	);

	return <NextLink className={classes} {...props} />;
}
