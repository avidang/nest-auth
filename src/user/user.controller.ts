import { Body, Controller, Delete, Get, Param, Put, Req } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Request } from "express";
import { UpdateUserDto } from "./dto/update-user.dto";
import type { User, UserDocument } from "./user.schema";
import { UserService } from "./user.service";
import { Protected } from "src/jwt/jwt.guard";
import { RequiredPermissions } from "src/role/permissions/permission.guard";
import { userPermissions } from "./user.permission";

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
	@RequiredPermissions(userPermissions.USER_READ)
	@Protected()
	async me(
		@Req() request: Request & { userId: string },
	): Promise<UserDocument | null> {
		return this.userService.findOne(request.userId);
	}

	@Get(":id")
	@RequiredPermissions(userPermissions.USER_READ)
	@Protected()
	async findOne(@Param("id") id: string): Promise<UserDocument | null> {
		return this.userService.findOne(id);
	}

	@Put(":id")
	@RequiredPermissions(userPermissions.USER_UPDATE)
	@Protected()
	async update(
		@Param("id") id: string,
		@Body() updateUserDto: UpdateUserDto,
	): Promise<UserDocument | null> {
		return this.userService.update(id, updateUserDto);
	}

	@Delete(":id")
	@RequiredPermissions(userPermissions.USER_DELETE)
	@Protected()
	async remove(@Param("id") id: string): Promise<UserDocument | null> {
		return this.userService.remove(id);
	}

	// Role endpoints
	@Put(":id/roles/:roleId/assign")
	@RequiredPermissions(userPermissions.USER_ASSIGN_ROLE)
	@Protected()
	async assignRole(
		@Param("id") id: string,
		@Param("roleId") roleId: string,
	): Promise<UserDocument | null> {
		return this.userService.assignRole(id, roleId);
	}
}
