import { LogoutButton } from "@/features/auth/logout/components/LogoutButton";

export default function HomePage() {
	return (
		<div>
			<h1>Private page</h1>
			<LogoutButton />
		</div>
	);
}
