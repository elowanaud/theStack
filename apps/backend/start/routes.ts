import router from "@adonisjs/core/services/router";
import { middleware } from "./kernel.js";

router.get("/auth/me", "#controllers/auth/me_controller");

router
	.group(() => {
		router.post("/auth/login", "#controllers/auth/login_controller");
		router.post("/auth/register", "#controllers/auth/register_controller");
	})
	.use(middleware.guest());

router
	.group(() => {
		router.delete("/auth/logout", "#controllers/auth/logout_controller");
	})
	.use(middleware.auth());
