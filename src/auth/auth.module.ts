import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { RouterModule } from "@nestjs/core";
import { JwtModule } from "src/jwt/jwt.module";
import { UserModule } from "src/user/user.module";
import { GoogleProviderModule } from "./google-provider/google-provider.module";
import { RoleModule } from "src/role/role.module";

@Module({
	imports: [
		ConfigModule,
		JwtModule,
		GoogleProviderModule,
		RouterModule.register([{ path: "users", module: UserModule }]),
		RouterModule.register([{ path: "roles", module: RoleModule }]),
	],
	controllers: [],
	providers: [],
	exports: [JwtModule],
})
export class AuthModule {}
