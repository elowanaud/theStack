import type { Meta, StoryObj } from "@storybook/react";
import { PasswordField } from "./PasswordField.tsx";

const meta = {
	title: "Components/Form/PasswordField",
	component: PasswordField,
} satisfies Meta<typeof PasswordField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		label: "Password",
		hint: "Enter your Password",
		error: "This is an error",
	},
};

export const Filled: Story = {
	args: {
		label: "Password",
		value: "eloitsme@gmail.com",
		hint: "Enter your Password",
		error: "This is an error",
	},
};
