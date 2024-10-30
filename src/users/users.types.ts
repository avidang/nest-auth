import { UserDocument } from "src/users/users.schema";

export type UserByProvider = {
	firstName: string;
	lastName: string;
	email: string;
	provider: {
		name: keyof UserDocument["providers"];
		data: Required<UserDocument["providers"]>[keyof UserDocument["providers"]];
	};
};
