import { Controller, Get, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Protected } from "./jwt/jwt.guard";

@ApiTags("app")
@Controller("/")
export class AppController {
	@Get("/echo")
	@Protected()
	@ApiBearerAuth()
	echoMessage(@Query("q") q: string) {
		return q;
	}
}
