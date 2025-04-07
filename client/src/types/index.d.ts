declare global {
	/* GIFTS */
	interface Gift {
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
	}

	/* UTILS */
	interface NavLinkType {
		label: string;
		href: string;
		className?: string;
	}
}

export {};
