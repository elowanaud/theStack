import { HouseIcon } from "@/icons/House/House.tsx";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button.tsx";

const meta = {
	component: Button,
	argTypes: {
		children: {
			name: "Content",
			description: "The content of the button",
			control: {
				type: "text",
			},
			type: "string",
		},
		variant: {
			name: "Variant",
			description: "The variant of the button",
			control: {
				type: "select",
			},
			options: ["primary", "ghost"],
			type: "string",
		},
		size: {
			name: "Size",
			description: "The size of the button",
			control: {
				type: "select",
			},
			options: ["base", "icon", "icon-sm"],
			type: "string",
		},
		disabled: {
			name: "Disabled",
			description: "Whether the button is disabled",
			control: {
				type: "boolean",
			},
			type: "boolean",
		},
		loading: {
			name: "Loading",
			description: "Whether the button is loading",
			control: {
				type: "boolean",
			},
			type: "boolean",
		},
	},
	args: {
		children: "Click me",
		variant: "primary",
		size: "base",
		loading: false,
	},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PrimaryVariant: Story = {
	args: {
		variant: "primary",
	},
};

export const GhostVariant: Story = {
	args: {
		variant: "ghost",
	},
};

export const BaseSize: Story = {
	args: {
		size: "base",
	},
};

export const IconSize: Story = {
	args: {
		variant: "ghost",
		size: "icon",
		children: <HouseIcon />,
	},
};

export const IconSmallSize: Story = {
	args: {
		variant: "ghost",
		size: "icon-sm",
		children: <HouseIcon />,
	},
};

export const LoadingState: Story = {
	args: {
		loading: true,
	},
};
