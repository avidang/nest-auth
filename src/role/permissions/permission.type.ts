import { userPermissions } from "src/user/user.permission";

const permissions = {
	...userPermissions,
};

export type Permissions = (typeof permissions)[keyof typeof permissions];

export type PermissionObject = {
	label: Permissions;
	description?: string;
};

export type PermissionList = PermissionObject[];
