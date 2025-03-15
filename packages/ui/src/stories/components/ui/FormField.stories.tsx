import type { Meta, StoryObj } from "@storybook/react";
import { FormField } from "../../../components/FormField.tsx";
import { Input } from "../../../components/Input.tsx";

const meta = {
	component: FormField,
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		label: "Email",
		hint: "Enter your email",
		error: "This is an error",
		children: (
			<Input type="email" placeholder="Enter your email" required={true} />
		),
	},
};
