import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService as NestJwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";
import { UserByProvider } from "src/users/users.types";

@Injectable()
export class JwtService {
	constructor(
		public readonly jwt: NestJwtService,
		private userService: UsersService,
	) {}

	async loginWithProvider(data: UserByProvider) {
		const user = await this.userService.getOrCreate(data);
		const payload = { email: user.email, sub: user.id };
		return {
			access_token: this.jwt.sign({
				...payload,
				type: "access_token",
			}),
			refresh_token: this.jwt.sign({
				...payload,
				type: "refresh_token",
			}),
		};
	}

	async getUserByToken(token: string) {
		const payload = this.jwt.verify(token);
		return this.userService.findOne(payload.sub);
	}

	async getNewRefreshToken(refreshToken: string) {
		const payload = this.jwt.verify(refreshToken);
		if (payload.type !== "refresh_token")
			throw new UnauthorizedException("Invalid token type");
		const user = await this.userService.findOne(payload.sub);
		if (!user) throw new UnauthorizedException("User not found");
		return {
			refreshToken: this.jwt.sign({
				email: user.email,
				sub: user.id,
				type: "refresh_token",
			}),
		};
	}
}
