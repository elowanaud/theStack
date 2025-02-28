import { LoaderIcon } from "@/icons/Loader/Loader";
import { cn } from "@/lib/cn";
import type { Prettify } from "@/types";
import { AnimatePresence, LazyMotion, domAnimation } from "motion/react";
import { span as MotionSpan } from "motion/react-m";
import type { ButtonHTMLAttributes, Ref } from "react";

export type ButtonProps = Prettify<
	ButtonHTMLAttributes<HTMLButtonElement> & {
		variant?: "primary" | "ghost";
		size?: "base" | "icon";
		loading?: boolean;
		ref?: Ref<HTMLButtonElement>;
	}
>;

export function Button({
	variant = "primary",
	size = "base",
	type = "button",
	loading,
	disabled,
	className,
	children,
	ref,
	...props
}: ButtonProps) {
	const classes = cn(
		[
			"relative inline-flex items-center justify-center rounded-md outline-none transition-colors [&_svg]:shrink-0",
			"disabled:cursor-not-allowed",
		],
		{
			"bg-primary-500 text-white": variant === "primary",
			"hover:bg-primary-600": variant === "primary",
			"focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-2":
				variant === "primary",
			"disabled:bg-primary-300": variant === "primary",
		},
		{
			"bg-transparent text-neutral-950": variant === "ghost",
			"hover:bg-neutral-100 focus-visible:bg-neutral-100": variant === "ghost",
			"disabled:bg-neutral-100 disabled:opacity-50": variant === "ghost",
		},
		{
			"h-9 px-4 text-sm [&_svg]:size-5": size === "base",
			"size-9 [&_svg]:size-5": size === "icon",
		},
		{
			"disabled:cursor-progress": loading,
		},
		className,
	);

	return (
		<LazyMotion features={domAnimation}>
			<button
				type={type}
				className={classes}
				ref={ref}
				disabled={disabled || loading}
				{...props}
			>
				<MotionSpan
					initial={{
						opacity: loading ? 0 : 1,
						y: loading ? "-100%" : "0%",
					}}
					animate={{
						opacity: loading ? 0 : 1,
						y: loading ? "-100%" : "0%",
					}}
					className="inline-flex items-center justify-center gap-2 whitespace-nowrap"
				>
					{children}
				</MotionSpan>
				<AnimatePresence>
					{loading && (
						<MotionSpan
							initial={{ y: "100%", opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							className="absolute"
						>
							<LoaderIcon className="animate-spin" />
						</MotionSpan>
					)}
				</AnimatePresence>
			</button>
		</LazyMotion>
	);
}
