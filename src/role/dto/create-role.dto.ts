import { ApiProperty } from "@nestjs/swagger";
import { PermissionList } from "../permissions/permission.type";

export class CreateRoleDto {
	@ApiProperty()
	name: string;

	@ApiProperty()
	description: string;

	@ApiProperty({
        type: [{ label: { type: "string" }, description: { type: "string" } }],
    })
	permissions: PermissionList;
}
