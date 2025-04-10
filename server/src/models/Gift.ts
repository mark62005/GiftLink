import { Schema, model } from "mongoose";

const giftSchema = new Schema(
	{
		id: {
			type: String,
			require: true,
			unique: true,
		},
		name: {
			type: String,
			required: true,
		},
		category: {
			type: String,
			required: true,
		},
		condition: {
			type: String,
			required: true,
		},
		posted_by: {
			type: String,
			required: true,
		},
		zipcode: {
			type: String,
			required: true,
		},
		date_added: {
			type: Number,
			required: true,
		},
		age_days: {
			type: Number,
			required: true,
		},
		age_years: {
			type: Number,
			required: true,
		},
		description: {
			type: String,
		},
		image: {
			type: String,
		},
	},
	{ timestamps: true }
);

const Gift = model("Gift", giftSchema);

export default Gift;
