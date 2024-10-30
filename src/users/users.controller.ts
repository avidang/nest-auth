import { Body, Controller, Delete, Get, Param, Put } from "@nestjs/common";
import { UpdateUserDto } from "./dto/update-user.dto";
import type { User, UserDocument } from "./users.schema";
import { UsersService } from "./users.service";
import { Protected } from "src/jwt/jwt.guard";
import { ApiBearerAuth } from "@nestjs/swagger";

@Controller()
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get()
  @Protected()
  @ApiBearerAuth()
	async findAll(): Promise<User[]> {
		return this.usersService.findAll();
	}

	@Get(":id")
	async findOne(@Param("id") id: string): Promise<UserDocument | null> {
		return this.usersService.findOne(id);
	}

	@Put(":id")
	async update(
		@Param("id") id: string,
		@Body() updateUserDto: UpdateUserDto,
	): Promise<UserDocument | null> {
		return this.usersService.update(id, updateUserDto);
	}

	@Delete(":id")
	async remove(@Param("id") id: string): Promise<UserDocument | null> {
		return this.usersService.remove(id);
	}
}
