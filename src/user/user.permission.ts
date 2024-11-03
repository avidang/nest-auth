const USER_READ = "user:read";
const USER_UPDATE = "user:update";
const USER_DELETE = "user:delete";
const USER_ASSIGN_ROLE = "user:assign-role";

export const userPermissions = {
	USER_READ,
	USER_UPDATE,
	USER_DELETE,
	USER_ASSIGN_ROLE,
} as const;

export type UserPermissions =
	(typeof userPermissions)[keyof typeof userPermissions];
