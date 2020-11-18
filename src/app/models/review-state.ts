import { Card } from './card';

export class ReviewState {

	active: boolean;
	cards: Card[];
	complete: boolean;

	constructor(config: ReviewStateConfig) {
		this.active = config.active || false;
		this.cards = config.cards;
		this.complete = false;
	}

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

}

export interface ReviewStateConfig {
	active?: boolean;
	cards: Card[];
	complete?: boolean;
}
