import { ApiProperty } from "@nestjs/swagger";

export class AssignRoleDto {
	@ApiProperty({ required: true })
	userId: string;
	@ApiProperty({ required: true })
	roleId: string;
}
