import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { Permission } from "./permissions/permission.type";

export type RoleDocument = HydratedDocument<Role>;
@Schema()
export class Role {
	@Prop({ required: true })
	name: string;

	@Prop()
	description: string;

	@Prop({ type: [String], default: [] })
	permissions: Permission[] = [];
}

export const RoleSchema = SchemaFactory.createForClass(Role);
