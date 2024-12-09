import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "./app.controller";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { RoleModule } from "./role/role.module";
import { RouterModule } from "@nestjs/core";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>("MONGODB_URI"),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    RoleModule,
    RouterModule.register([
      { path: "/users", module: UserModule },
      { path: "/roles", module: RoleModule },
    ]),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
