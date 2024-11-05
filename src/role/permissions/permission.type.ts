import { userPermissions } from "src/user/user.permission";

const permissions = {
	...userPermissions,
};

export type Permission = (typeof permissions)[keyof typeof permissions];
