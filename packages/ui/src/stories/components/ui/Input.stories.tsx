import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "../../../components/Input.tsx";

const meta = {
	component: Input,
	argTypes: {
		type: {
			name: "Type",
			description: "The type of the input",
			control: {
				type: "select",
			},
			options: ["text", "email", "number", "url"],
			type: "string",
		},
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
		type: "text",
		placeholder: "",
		disabled: false,
	},
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Filled: Story = {
	args: {
		type: "text",
		value: "Hello World",
	},
};

export const WithPlaceholder: Story = {
	args: {
		placeholder: "Enter your email",
	},
};

export const Disabled: Story = {
	args: {
		disabled: true,
	},
};
