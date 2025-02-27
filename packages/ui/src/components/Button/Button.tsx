import type { ButtonHTMLAttributes, Ref } from "react";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	ref?: Ref<HTMLButtonElement>;
};

export function Button({ ref, ...props }: ButtonProps) {
	return <button ref={ref} {...props} />;
}
