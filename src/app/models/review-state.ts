import { Card } from './card';

export class ReviewState {

	constructor(config: ReviewStateConfig = {}) {
		this.active = config.active || false;
		this.cards = config.cards || null;
		this.complete = false;
	}

	active: boolean;
	cards: Card[];
	complete: boolean;

	get activeCard(): Card {
		return this.cards[0];
	}

	answered(correct: boolean): void {
		const card: Card = this.cards.shift();
		if (!correct) { this.cards.push(card); }
		if (!this.cards.length) {
			this.active = false;
			this.complete = true;
		}
	}

	beginReview(cards: Card[]): void {
		this.active = true;
		this.cards = cards;
	}

}

export interface ReviewStateConfig {
	active?: boolean;
	cards?: Card[];
	complete?: boolean;
}
