import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserDto {
	@ApiProperty()
	email?: string;

	@ApiProperty()
	firstName?: string;

	@ApiProperty()
	lastName?: string;

	@ApiProperty()
	picture?: string;

	@ApiProperty()
	refreshToken?: string;
}
