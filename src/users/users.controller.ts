import { Body, Controller, Delete, Get, Param, Put, Req } from "@nestjs/common";
import { UpdateUserDto } from "./dto/update-user.dto";
import type { User, UserDocument } from "./users.schema";
import { UsersService } from "./users.service";
import { Protected } from "src/jwt/jwt.guard";
import { Request } from "express";

@Controller()
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get()
	@Protected()
	async findAll(): Promise<User[]> {
		return this.usersService.findAll();
	}

	@Get("me")
	@Protected()
	async me(
		@Req() request: Request & { userId: string },
	): Promise<UserDocument | null> {
		return this.usersService.findOne(request.userId);
	}

	@Get(":id")
	@Protected()
	async findOne(@Param("id") id: string): Promise<UserDocument | null> {
		return this.usersService.findOne(id);
	}

	@Put(":id")
	@Protected()
	async update(
		@Param("id") id: string,
		@Body() updateUserDto: UpdateUserDto,
	): Promise<UserDocument | null> {
		return this.usersService.update(id, updateUserDto);
	}

	@Delete(":id")
	@Protected()
	async remove(@Param("id") id: string): Promise<UserDocument | null> {
		return this.usersService.remove(id);
	}
}
