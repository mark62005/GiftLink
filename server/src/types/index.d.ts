declare global {
	export interface JwtPayload {
		user: {
			id: string;
		};
	}

	export interface UserFields {
		firstName: string;
		lastName: string;
		email: string;
	}

	namespace Express {
		interface Request {
			user?: {
				id: string;
			};
		}
	}
}

export {};
