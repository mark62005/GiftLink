declare global {
	/* GIFTS */
	interface Gift {
		_id: string;
		id: string;
		name: string;
		category: string;
		condition: string;
		posted_by: string;
		zipcode: string;
		date_added: number;
		age_days: number;
		age_years: number;
		description: string;
		image?: string;
		createdAt: Date;
		updatedAt: Date;
	}

	interface GiftComment {
		_id: string;
		authorId: string;
		author: string;
		content: string;
	}

	/* USERS */
	interface User {
		firstName: string;
		lastName: string;
		email: string;
	}

	/* UTILS */
	interface NavLinkType {
		label: string;
		href: string;
		className?: string;
	}
}

export {};
