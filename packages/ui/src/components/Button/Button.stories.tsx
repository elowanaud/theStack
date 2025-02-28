import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./Button.tsx";

const meta = {
	component: Button,
	argTypes: {
		children: {
			name: "Content",
			description: "The content of the button",
			defaultValue: "Button",
			control: {
				type: "text",
			},
			type: "string",
		},
	},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		children: "Button",
	},
};
