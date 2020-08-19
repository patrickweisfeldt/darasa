import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { ActiveDeckService } from '../active-deck.service';
import { Deck, Card } from '../../models';

@Component({
	selector: 'app-deck-review',
	templateUrl: './deck-review.component.html',
	styleUrls: ['./deck-review.component.css']
})
export class DeckReviewComponent implements OnInit {

	constructor(private activeDeck: ActiveDeckService) { }

	card: Card;

	deck$: Observable<Deck>;

	reviewStart: boolean = false;

	reviewComplete: boolean = false;

	beginReview(): void {
		this.reviewStart = true;
		this.activeDeck.beginReview();
	}

	ngOnInit(): void {
		this.deck$ = this.activeDeck.deck$;
		this.activeDeck.reviewState$.subscribe({
			next: state => this.card = state ? state[0] : null,
			complete: () => this.reviewComplete = true
		});
	}

	submitAnswer(correct: boolean): void {
		this.activeDeck.reviewCard(correct);
	}

}
