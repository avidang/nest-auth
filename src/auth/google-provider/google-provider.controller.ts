import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import type { Request } from "express";
import { GoogleOauthGuard } from "./google-oauth.guard";
import { GoogleUser } from "./google-user.dto";
import { JwtService } from "src/jwt/jwt.service";
import { Public } from "src/config/decorators";

@Controller("auth/google")
export class GoogleProviderController {
	constructor(private jwtService: JwtService) {}

	@Public()
	@Get("/")
	@UseGuards(GoogleOauthGuard)
	async googleAuth() {}

	@Public()
	@Get("/callback")
	@UseGuards(GoogleOauthGuard)
	async googleAuthRedirect(@Req() req: Request & { user: GoogleUser }) {
		const { user } = req;
		return this.jwtService.loginWithProvider({
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			provider: {
				name: "google",
				data: { id: user.id, picture: user.picture },
			},
		});
	}
}
