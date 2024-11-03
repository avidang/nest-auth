import { Module } from "@nestjs/common";
import { PermissionGuard } from "./permission.guard";

@Module({
	imports: [],
	controllers: [],
	providers: [PermissionGuard],
	exports: [],
})
export class PermissionModule {}
