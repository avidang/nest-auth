import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule as NestJwtModule } from "@nestjs/jwt";
import { UserModule } from "src/user/user.module";
import { JwtGuard } from "./jwt.guard";
import { JwtService } from "./jwt.service";

@Module({
	imports: [
		NestJwtModule.registerAsync({
			imports: [ConfigModule],
			useFactory: async (configService: ConfigService) => ({
				secret: configService.get("JWT_SECRET"),
				signOptions: { expiresIn: "1h" },
			}),
			inject: [ConfigService],
		}),
		UserModule,
	],
	providers: [JwtGuard, JwtService],
	exports: [JwtService],
})
export class JwtModule {}
