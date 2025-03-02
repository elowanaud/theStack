"use client";

import { Button } from "@/components/Button/Button";
import { Input, type InputProps } from "@/components/Input/Input";
import { EyeIcon } from "@/icons/Eye/Eye";
import { EyeOffIcon } from "@/icons/EyeOff/EyeOff";
import { cn } from "@/lib/cn";
import { useState } from "react";
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
