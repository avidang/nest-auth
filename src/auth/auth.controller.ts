import { Controller, } from "@nestjs/common";
import { JwtService } from "src/jwt/jwt.service";

@Controller("auth")
export class AuthController {
	constructor(private jwtService: JwtService) {}
}
