export const HEADER_HEIGHT = 56;
export const MAIN_HEIGHT = `calc(100vh - ${HEADER_HEIGHT}px)`;

export const STORAGE_KEYS = {
	AUTH_TOKEN: "auth_token",
	FIRST_NAME: "first_name",
	LAST_NAME: "last_name",
	EMAIL: "email",
} as const;
