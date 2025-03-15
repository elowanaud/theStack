import type { Meta, StoryObj } from "@storybook/react";
import { Password } from "../../../components/Password.tsx";

const meta = {
	component: Password,
	argTypes: {
		placeholder: {
			name: "Placeholder",
			description: "The placeholder of the input",
			control: {
				type: "text",
			},
			type: "string",
		},
		disabled: {
			name: "Disabled",
			description: "Whether the input is disabled",
			control: {
				type: "boolean",
			},
			type: "boolean",
		},
	},
	args: {
		placeholder: "",
		disabled: false,
	},
} satisfies Meta<typeof Password>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Filled: Story = {
	args: {
		value: "Hello World",
	},
};

export const WithPlaceholder: Story = {
	args: {
		placeholder: "Enter your password",
	},
};

export const Disabled: Story = {
	args: {
		disabled: true,
	},
};
