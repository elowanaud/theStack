import { apiClient } from "@/lib/api";
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
		const { data: user, error } = await apiClient.auth.login.$post(data);

		if (error) {
			console.log(error.status)
			console.log(error.value)
			// TODO: send toast error
		}

		console.log(user)
		// TODO: store the user
		// TODO: send toast success
		// TODO: redirect to home
	};

	return {
		register,
		isSubmitting,
		handleSubmit,
		onSubmit,
	};
}
