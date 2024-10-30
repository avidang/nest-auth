import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>;

type GoogleProvider = { id: string; picture: string };
type FacebookProvider = { id: string; picture: { data: { url: string } } };
type Providers = { google?: GoogleProvider; facebook?: FacebookProvider };

@Schema()
export class User {
	@Prop({ type: Object, default: {} })
	providers: Providers = {};

	@Prop({ required: true })
	email: string;

	@Prop()
	firstName: string;

	@Prop()
	lastName: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
