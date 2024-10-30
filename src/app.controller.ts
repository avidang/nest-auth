import { Controller, Get, Query } from "@nestjs/common";
import { Protected } from "./jwt/jwt.guard";
import { ApiBearerAuth } from "@nestjs/swagger";

@Controller("/")
export class AppController {
	@Get("/echo")
	@Protected()
	@ApiBearerAuth()
	echoMessage(@Query("q") q: string) {
		return q;
	}
}
