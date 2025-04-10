import { JwtPayload } from "jsonwebtoken";

export interface ICustomJwtPayload extends JwtPayload {
	user: {
		id: string;
	};
}
