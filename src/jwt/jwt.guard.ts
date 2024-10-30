import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
	UseGuards,
} from "@nestjs/common";
import type { Request } from "express";
import { JwtService } from "./jwt.service";

@Injectable()
export class JwtGuard implements CanActivate {
	constructor(private jwtService: JwtService) {}

	async canActivate(context: ExecutionContext) {
		const request = context.switchToHttp().getRequest();
		const token = this.getBearerToken(request);
		if (!token) throw new UnauthorizedException("No token provided");

		const payload = await this.jwtService.jwt
			.verifyAsync(token)
			.catch(() => null);
		if (!payload) throw new UnauthorizedException("Invalid token");
		request.userId = payload.sub;
		return true;
	}

	private getBearerToken(request: Request) {
		const authHeader = request.headers["authorization"];
		if (typeof authHeader !== "string") return null;
		const [bearer, token] = authHeader.split(" ");
		if (bearer !== "Bearer" || !token) return null;
		return token;
	}
}

export const Protected = () => UseGuards(JwtGuard);
