import router from "@adonisjs/core/services/router";
import { middleware } from "#start/kernel";

router
	.group(() => {
		router.get("/me", "#controllers/auth/me_controller");

		router
			.group(() => {
				router.post("/login", "#controllers/auth/login_controller");
				router.post("/register", "#controllers/auth/register_controller");
				router.post(
					"/forgot-password",
					"#controllers/auth/forgot_password_controller",
				);
				router.post(
					"/reset-password",
					"#controllers/auth/reset_password_controller",
				);
			})
			.use(middleware.guest());

		router
			.delete("/logout", "#controllers/auth/logout_controller")
			.use(middleware.auth());
	})
	.prefix("/auth");
