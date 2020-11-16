export interface User {
	_id: string;
	email: string;
	password: string;
	firstName: string;
	lastName: string;
}

export interface Deck {
	_id: string;
	user: string;
	name: string;
	cards: Card[];
	dateCreated: Date;
	lastAddedTo: Date;
	lastReviewed: Date;
}

export interface Card {
	_id: string;
	front: string;
	back: string;
	tags?: string[];
	data?: {
		dateCreated?: Date;
		lastReview?: Date;
		nextReview?: Date;
		sessionReviews?: number;
		totalReviews?: number;
		viewsThisSession?: number;
	};
}

export function shuffle(array: any[]): void {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}
