import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	Req,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Request } from "express";
import { UpdateUserDto } from "./dto/update-user.dto";
import type { User, UserDocument } from "./user.schema";
import { UserService } from "./user.service";
import { Protected } from "src/jwt/jwt.guard";
import { RequiredPermissions } from "src/role/permissions/permission.guard";
import { userPermissions } from "./user.permission";
import { AssignRoleDto } from "./dto/assign-role.dto";

@ApiTags("users")
@Controller()
export class UserController {
	constructor(private readonly userService: UserService) {}

	// User endpoints
	@Get()
	@RequiredPermissions(userPermissions.USER_READ)
	@Protected()
	async findAll(): Promise<User[]> {
		return this.userService.findAll();
	}

	@Get("me")
	@RequiredPermissions(userPermissions.USER_READ, "user:delete")
	@Protected()
	async me(
		@Req() request: Request & { userId: string },
	): Promise<UserDocument | null> {
		return this.userService.findOne(request.userId);
	}

	@Get("user/:id")
	@RequiredPermissions(userPermissions.USER_READ)
	@Protected()
	async findOne(@Param("id") id: string): Promise<UserDocument | null> {
		return this.userService.findOne(id);
	}

	@Post("user/:id/update")
	@RequiredPermissions(userPermissions.USER_UPDATE)
	@Protected()
	async update(
		@Param("id") id: string,
		@Body() updateUserDto: UpdateUserDto,
	): Promise<UserDocument | null> {
		return this.userService.update(id, updateUserDto);
	}

	@Post("user/:id/delete")
	@RequiredPermissions(userPermissions.USER_DELETE)
	@Protected()
	async remove(@Param("id") id: string): Promise<UserDocument | null> {
		return this.userService.remove(id);
	}

	// Role endpoints
	@Post("assign-role")
	@RequiredPermissions(userPermissions.USER_ASSIGN_ROLE)
	@Protected()
	async assignRole(
		@Body() { userId, roleId }: AssignRoleDto,
	): Promise<UserDocument | null> {
		return this.userService.assignRole(userId, roleId);
	}
}
