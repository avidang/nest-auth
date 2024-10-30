import { Controller, Get, Query, } from "@nestjs/common";
import { JwtService } from "src/jwt/jwt.service";

@Controller("auth")
export class AuthController {
	constructor(private jwtService: JwtService) {}

	@Get("sign_test")
	async signTest(@Query("value") value: string) {
		return this.jwtService.jwt.sign({ value });
	}
}
