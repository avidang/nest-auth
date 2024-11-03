import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { RoleSchema } from "./role.schema";
import { RoleController } from "./role.controller";
import { RoleService } from "./role.service";
import { AuthModule } from "src/auth/auth.module";

@Module({
	imports: [
		forwardRef(() => AuthModule),
		MongooseModule.forFeature([{ name: "Role", schema: RoleSchema }]),
	],
	controllers: [RoleController],
	providers: [RoleService],
	exports: [RoleService],
})
export class RoleModule {}
