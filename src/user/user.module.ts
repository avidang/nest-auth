import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "./user.schema";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { AuthModule } from "src/auth/auth.module";
import { RoleSchema } from "src/role/role.schema";

@Module({
	imports: [
		forwardRef(() => AuthModule),
		MongooseModule.forFeature([{ name: "User", schema: UserSchema }]),
		MongooseModule.forFeature([{ name: "Role", schema: RoleSchema }]),
	],
	controllers: [UserController],
	providers: [UserService],
	exports: [UserService],
})
export class UserModule {}
