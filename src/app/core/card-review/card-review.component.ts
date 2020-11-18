import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Card } from '../../models/card';

@Component({
	selector: 'app-card-review',
	templateUrl: './card-review.component.html',
	styleUrls: ['./card-review.component.css']
})
export class CardReviewComponent {

	constructor() { }

	@Input() card: Card;

	@Output() review: EventEmitter<boolean> = new EventEmitter();

	revealed: boolean = false;

	submitAnswer(correct: boolean): void {
		this.card.answered(correct);
		this.review.emit(correct);
		this.revealed = false;
	}

	toggleReveal(): void {
		this.revealed = !this.revealed;
	}

}
