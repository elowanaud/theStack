import { sleep } from "@/utils/sleep";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export function useLogin() {
	const validator = z.object({
		email: z.string(),
		password: z.string(),
	});

	const {
		register,
		formState: { isSubmitting },
		handleSubmit,
	} = useForm({
		resolver: zodResolver(validator),
	});

	const onSubmit = async (data: z.infer<typeof validator>) => {
		console.log(data);
		await sleep(1000);
		// TODO: call login api
	};

	return {
		register,
		isSubmitting,
		handleSubmit,
		onSubmit,
	};
}
