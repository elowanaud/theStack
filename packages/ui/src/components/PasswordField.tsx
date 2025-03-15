import { cn } from "../lib/cn.ts";
import { Password, type PasswordProps } from "./Password.tsx";
import {
	ErrorText,
	type ErrorTextProps,
	HintText,
	type HintTextProps,
	Label,
	type LabelProps,
} from "./Typography.tsx";

export type PasswordFieldProps = PasswordProps & {
	label?: string;
	labelOptions?: Omit<LabelProps, "children" | "required">;
	hint?: string;
	hintOptions?: Omit<HintTextProps, "children">;
	error?: string;
	errorOptions?: Omit<ErrorTextProps, "children">;
	wrapperClassName?: string;
};

export function PasswordField({
	label,
	labelOptions,
	hint,
	hintOptions,
	error,
	errorOptions,
	required,
	name,
	wrapperClassName,
	id = name,
	...props
}: PasswordFieldProps) {
	return (
		<div className={cn("grid gap-0.5", wrapperClassName)}>
			{label && (
				<Label htmlFor={id} required={required} {...labelOptions}>
					{label}
				</Label>
			)}
			<Password name={name} id={id} required={required} {...props} />
			{hint && <HintText {...hintOptions}>{hint}</HintText>}
			{error && <ErrorText {...errorOptions}>{error}</ErrorText>}
		</div>
	);
}
