import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
} from "@nestjs/common";
import { RoleService } from "./role.service";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { ApiTags } from "@nestjs/swagger";
import { CreateRoleDto } from "./dto/create-role.dto";

@ApiTags("roles")
@Controller()
export class RoleController {
	constructor(private readonly rolesService: RoleService) {}

	@Post()
	async create(@Body() createRoleDto: CreateRoleDto) {
		return this.rolesService.create(createRoleDto);
	}

	@Get()
	async findAll() {
		return this.rolesService.findAll();
	}

	@Get(":id")
	async findOne(@Param("id") id: string) {
		return this.rolesService.findOne(id);
	}

	@Put(":id")
	async update(@Param("id") id: string, @Body() updateRoleDto: UpdateRoleDto) {
		return this.rolesService.update(id, updateRoleDto);
	}

	@Delete(":id")
	async remove(@Param("id") id: string) {
		return this.rolesService.remove(id);
	}
}
