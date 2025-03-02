import { sleep } from "@/utils/sleep";
import { userValidator } from "@/validators/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";

export function useRegister() {
	const validator = userValidator.pick({
		email: true,
		password: true,
	});

	const {
		register,
		formState: { isSubmitting, errors },
		handleSubmit,
	} = useForm({
		resolver: zodResolver(validator),
	});

	const onSubmit = async (data: z.infer<typeof validator>) => {
		console.log(data);
		await sleep(1000);
		// TODO: call register api
	};

	return {
		register,
		errors,
		isSubmitting,
		handleSubmit,
		onSubmit,
	};
}
