import type { Meta, StoryObj } from "@storybook/react";

import { LoaderIcon } from "./Loader.tsx";

const meta = {
	component: LoaderIcon,
	args: {
		size: 32,
	},
	argTypes: {
		size: {
			name: "size",
			description: "The size of the icon",
			control: {
				type: "range",
				min: 16,
				max: 128,
				step: 8,
			},
			type: "number",
		},
		className: {
			name: "className",
			description: "The className of the icon",
			control: {
				disable: true,
			},
			type: "string",
		},
	},
} satisfies Meta<typeof LoaderIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
