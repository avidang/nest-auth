import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "src/jwt/jwt.module";
import { GoogleProviderModule } from "./google-provider/google-provider.module";
import { RouterModule } from "@nestjs/core";

@Module({
	imports: [
		ConfigModule,
		JwtModule,
		GoogleProviderModule,
		RouterModule.register([
			{
				path: "/auth",
				children: [{ path: "/google", module: GoogleProviderModule }],
			},
		]),
	],
	controllers: [],
	providers: [],
	exports: [JwtModule],
})
export class AuthModule {}
