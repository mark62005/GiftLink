declare global {
	export interface JwtPayload {
		user: {
			id: string;
		};
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
