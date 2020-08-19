import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Deck, Card } from '../models';
import { environment } from '../../environments/environment';


const baseUrl = environment.apiUrl;
const urls = {
	cards: `${baseUrl}/cards`,
	decks: `${baseUrl}/decks`,
	cardId: (deck: Deck, card: Card) => `${baseUrl}/cards/${deck._id}/${card._id}`,
	deckId: (deck: Deck) => `${baseUrl}/decks/${deck._id}`
};

const httpOptions = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json'
	})
};


@Injectable({
	providedIn: 'root'
})
export class DataService {

	constructor(private http: HttpClient) { }



	private readonly _deckList = new BehaviorSubject<Deck[]>( [] );

	private get deckList(): Deck[] {
		return this._deckList.getValue();
	}

	private set deckList(value: Deck[]) {
		value = value.map(this.convertToDates);
		this._deckList.next(value);
	}

	readonly deckList$: Observable<Deck[]> = this._deckList.asObservable();

	readonly deckListAlphabetical$: Observable<Deck[]> = this.deckList$.pipe(
		map(decks => decks.sort((a: Deck, b: Deck) => {
			if (a.name.toLowerCase() < b.name.toLowerCase()) { return -1; }
			if (a.name.toLowerCase() > b.name.toLowerCase()) { return  1; }
			return 0;
		}))
	);



	addCard(deck: Deck, card: any): void {
		this.http.post<Deck>(`${urls.cards}/${deck._id}`, card, httpOptions)
			.subscribe(updatedDeck =>
				this.deckList = [...this.deckList.filter(d => d._id !== updatedDeck._id), updatedDeck]
			);
	}

	addDeck(name: string): void {
		this.http.post<Deck>(urls.decks, { name }, httpOptions)
			.subscribe(deck => this.deckList = [...this.deckList, deck]);
	}

	convertToDates(deck: Deck): Deck {
		deck.dateCreated = new Date(deck.dateCreated);
		deck.lastAddedTo = new Date(deck.lastAddedTo);
		deck.lastReviewed = new Date(deck.lastReviewed);
		deck.cards.map(card => {
			card.data.dateCreated = new Date(card.data.dateCreated);
			card.data.lastReview = new Date(card.data.lastReview);
			card.data.nextReview = new Date(card.data.nextReview);
		});
		return deck;
	}

	deleteCard(deck: Deck, card: Card): void {
		this.http.delete<Deck>(urls.cardId(deck, card), httpOptions)
			.subscribe(updatedDeck =>
				this.deckList = [...this.deckList.filter(d => d._id !== updatedDeck._id), updatedDeck]
			);
	}

	deleteDeck(deck: Deck): void {
		this.http.delete<Deck>(urls.deckId(deck), httpOptions)
			.subscribe(deleted => {
				this.deckList = [...this.deckList.filter(d => d._id !== deleted._id)];
			});
	}

	editCard(deck: Deck, card: Card): void {
		const data = { front: card.front, back: card.back, tags: card.tags };
		this.http.patch<Card>(urls.cardId(deck, card), data, httpOptions)
			.subscribe(_ => {
				deck.cards = [...deck.cards.filter(c => c._id !== card._id), card];
				this.deckList = [...this.deckList.filter(d => d._id !== deck._id), deck];
			});
	}

	getDecksFromDB(): void {
		this.http.get<Deck[]>(urls.decks, httpOptions)
			.subscribe(decks => this.deckList = decks);
	}

	reviewCard(deck: Deck, card: Card): void {
		this.http.put<Card>(urls.cardId(deck, card), card.data, httpOptions)
			.subscribe(_ => {
				deck.cards = [...deck.cards.filter(c => c._id !== card._id), card];
				this.deckList = [...this.deckList.filter(d => d._id !== deck._id), deck];
			});
	}

}
