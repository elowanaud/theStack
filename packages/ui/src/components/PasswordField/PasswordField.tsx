import { Password, type PasswordProps } from "@/components/Password/Password";
import {
	ErrorText,
	type ErrorTextProps,
	HintText,
	type HintTextProps,
	Label,
	type LabelProps,
} from "@/components/Typography/Typography";

export type PasswordFieldProps = PasswordProps & {
	label?: string;
	labelOptions?: Omit<LabelProps, "children" | "required">;
	hint?: string;
	hintOptions?: Omit<HintTextProps, "children">;
	error?: string;
	errorOptions?: Omit<ErrorTextProps, "children">;
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
	id = name,
	...props
}: PasswordFieldProps) {
	return (
		<div className="grid gap-0.5">
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
