import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PassportModule } from "@nestjs/passport";
import { GoogleProviderController } from "./google-provider.controller";
import { GoogleStrategy } from "./google.strategy";
import { JwtModule } from "src/jwt/jwt.module";

@Module({
	imports: [PassportModule, ConfigModule, JwtModule],
	controllers: [GoogleProviderController],
	providers: [GoogleStrategy],
	exports: [],
})
export class GoogleProviderModule {}
