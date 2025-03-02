import type { Meta, StoryObj } from "@storybook/react";
import { InputField } from "./InputField.tsx";

const meta = {
	title: "Components/Form/InputField",
	component: InputField,
} satisfies Meta<typeof InputField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		label: "Email",
		hint: "Enter your email",
		error: "This is an error",
	},
};

export const Filled: Story = {
	args: {
		label: "Email",
		value: "eloitsme@gmail.com",
		hint: "Enter your email",
		error: "This is an error",
	},
};
