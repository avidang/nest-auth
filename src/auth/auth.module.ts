import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from "src/users/users.module";
import { AuthController } from "./auth.controller";
import { JwtModule } from "src/jwt/jwt.module";
import { GoogleProviderModule } from "./google-provider/google-provider.module";
import { RouterModule } from "@nestjs/core";

@Module({
	imports: [
		ConfigModule,
		JwtModule,
		GoogleProviderModule,
		RouterModule.register([{ path: "users", module: UsersModule }]),
	],
	controllers: [AuthController],
	providers: [],
	exports: [JwtModule],
})
export class AuthModule {}
