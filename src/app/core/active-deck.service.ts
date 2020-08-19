import { Injectable } from '@angular/core';
import { ParamMap } from '@angular/router';

import { BehaviorSubject, combineLatest, Observable } from 'rxjs';

import { DataService } from './data.service';
import { Deck, Card, shuffle } from '../models';


@Injectable({
	providedIn: 'root'
})
export class ActiveDeckService {

	constructor(private data: DataService) { }



	private readonly _deck: BehaviorSubject<Deck> = new BehaviorSubject(null);

	private get deck(): Deck {
		return this._deck.getValue();
	}

	private set deck(value: Deck) {
		this._deck.next(value);
	}

	readonly deck$: Observable<Deck> = this._deck.asObservable();



	private readonly _reviewState: BehaviorSubject<Card[]> = new BehaviorSubject(null);

	private get reviewState(): Card[] {
		return this._reviewState.getValue();
	}

	private set reviewState(value: Card[]) {
		if (value.length) {
			this._reviewState.next(value);
		} else {
			this._reviewState.complete();
		}
	}

	readonly reviewState$: Observable<Card[]> = this._reviewState.asObservable();



	addCard(cardData: any): void {
		this.data.addCard(this.deck, cardData);
	}

	beginReview(): void {
		const now = new Date();
		const cards = Array.from(this.deck.cards.filter(card => card.data.nextReview <= now));
		shuffle(cards);
		this.reviewState = cards;
	}

	calculateNextReview(card: Card): Date {
		const nextReview = new Date();
		const difference = nextReview.getTime() - card.data.lastReview.getTime();
		const msPerDay = 1000 * 60 * 60 * 24;
		const increment = Math.round(difference / msPerDay) * 2 || 1;
		nextReview.setDate(nextReview.getDate() + increment);
		return nextReview;
	}

	deleteCard(card: Card): void {
		this.data.deleteCard(this.deck, card);
	}

	getRouteParams(route: Observable<ParamMap>): void {
		combineLatest([route, this.data.deckList$]).subscribe(([params, decks]) =>
			this.deck = decks.find(deck => deck.name === params.get('name'))
		);
	}

	editCard(card: Card): void {
		this.data.editCard(this.deck, card);
	}

	reviewCard(correct: boolean): void {
		const card = this.reviewState[0];
		card.data.totalReviews++;
		if (correct) {
			card.data.sessionReviews++;
			card.data.viewsThisSession = 0;
			card.data.nextReview = this.calculateNextReview(card);
			card.data.lastReview = new Date();
			this.data.reviewCard(this.deck, card);
		} else {
			card.data.viewsThisSession++;
			card.data.lastReview = new Date();
		}
		this.updateReviewState(correct);
	}

	updateReviewState(correct: boolean): void {
		const reviewState = this.reviewState;
		const card = reviewState.shift();
		if (!correct) { reviewState.push(card); }
		this.reviewState = reviewState;
	}

}
