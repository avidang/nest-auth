import {
	applyDecorators,
	CanActivate,
	ExecutionContext,
	Injectable,
	SetMetadata,
	UnauthorizedException,
	UseGuards,
} from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { Reflector } from "@nestjs/core";
import { Permissions } from "./permission.type";

@Injectable()
export class PermissionGuard implements CanActivate {
	constructor(
		private reflector: Reflector,
		private userService: UserService,
	) {}
	async canActivate(context: ExecutionContext) {
		const requiredPermissions = this.reflector.get<string[]>(
			"permissions",
			context.getHandler(),
		) as Permissions[];

		if (!requiredPermissions)
			throw new UnauthorizedException("No permissions provided");

		const request = context.switchToHttp().getRequest();
		const userRoles = await this.userService.getRoles(request.userId);

		const userPermissions = userRoles.flatMap((role) =>
			role.permissions.map((permission) => permission.label),
		);
		const hasPermission = requiredPermissions.every((permission) =>
			userPermissions.includes(permission),
		);
		if (!hasPermission) {
			const missingPermissions = requiredPermissions.filter(
				(permission) => !userPermissions.includes(permission),
			);
			throw new UnauthorizedException(
				`Missing permissions: ${missingPermissions.join(", ")}`,
			);
		}
		return true;
	}
}

export const RequiredPermissions = (...permissions: Permissions[]) =>
	applyDecorators(
		SetMetadata("permissions", permissions),
		UseGuards(PermissionGuard),
	);
