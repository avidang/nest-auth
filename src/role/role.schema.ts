import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { PermissionList } from "./permissions/permission.type";

export type RoleDocument = HydratedDocument<Role>;

@Schema()
export class Role {
	@Prop({ required: true })
	name: string;

	@Prop()
	description: string;

	@Prop({ type: [{
        label: { type: "string" },
        description: { type: "string" },
    }], default: [] })
	permissions: PermissionList = [];
}

export const RoleSchema = SchemaFactory.createForClass(Role);
