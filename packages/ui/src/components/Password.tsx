"use client";

import { useState } from "react";
import { EyeIcon } from "../icons/Eye.tsx";
import { EyeOffIcon } from "../icons/EyeOff.tsx";
import { cn } from "../lib/cn.ts";
import { Button } from "./Button.tsx";
import { Input, type InputProps } from "./Input.tsx";
export type PasswordProps = Omit<InputProps, "type">;

export function Password({ className, disabled, ...props }: PasswordProps) {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<div className="relative flex items-center">
			<Input
				className={cn("pr-9", className)}
				type={showPassword ? "text" : "password"}
				disabled={disabled}
				{...props}
			/>
			<Button
				variant="ghost"
				size="icon-sm"
				className="absolute right-1"
				disabled={disabled}
				onClick={() => setShowPassword(!showPassword)}
			>
				{showPassword ? <EyeOffIcon /> : <EyeIcon />}
			</Button>
		</div>
	);
}
