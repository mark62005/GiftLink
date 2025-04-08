import { Schema, model } from "mongoose";

const userSchema = new Schema(
	{
		firstName: {
			type: String,
			required: true,
			min: 2,
			max: 100,
		},
		lastName: {
			type: String,
			required: true,
			min: 2,
			max: 100,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			max: 100,
		},
		password: {
			type: String,
			required: true,
			min: 8,
		},
	},
	{ timestamps: true }
);

const User = model("User", userSchema);

export default User;
