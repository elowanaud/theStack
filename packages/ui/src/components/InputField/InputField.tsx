import { Input, type InputProps } from "@/components/Input/Input";
import {
	ErrorText,
	type ErrorTextProps,
	HintText,
	type HintTextProps,
	Label,
	type LabelProps,
} from "@/components/Typography/Typography";

export type InputFieldProps = InputProps & {
	label?: string;
	labelOptions?: Omit<LabelProps, "children" | "required">;
	hint?: string;
	hintOptions?: Omit<HintTextProps, "children">;
	error?: string;
	errorOptions?: Omit<ErrorTextProps, "children">;
};

export function InputField({
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
}: InputFieldProps) {
	return (
		<div className="grid gap-0.5">
			{label && (
				<Label htmlFor={id} required={required} {...labelOptions}>
					{label}
				</Label>
			)}
			<Input name={name} id={id} required={required} {...props} />
			{hint && <HintText {...hintOptions}>{hint}</HintText>}
			{error && <ErrorText {...errorOptions}>{error}</ErrorText>}
		</div>
	);
}
