import { AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Card, CardInterface } from './card';
import { ReviewState } from './review-state';


export class Deck {

	name: string;
	cards: Card[];
	dateCreated: Date;
	lastAddedTo: Date;
	lastReviewed: Date;

	cardCollection: AngularFirestoreCollection<CardInterface>;
	firestoreDocument: AngularFirestoreDocument;

	reviewState: ReviewState;

	constructor(data: DeckInterface) {
		this.name = data.name;
		this.dateCreated = data.dateCreated ? new Date(data.dateCreated) : new Date();
		this.lastAddedTo = data.lastAddedTo ? new Date(data.lastAddedTo) : new Date();
		this.lastReviewed = data.lastReviewed ? new Date(data.lastReviewed) : new Date();
		this.firestoreDocument = data.firestoreDocument || null;
		if (this.firestoreDocument) {
			this.cardCollection = this.firestoreDocument.collection<CardInterface>('cards');
		}
	}

	get cardsToReview(): number {
		const now: Date = new Date();
		return this.cards.reduce((acc, cur) => {
			const include: number = cur.data.nextReview < now ? 1 : 0;
			return acc + include;
		}, 0);
	}

	private _shuffle(array: any[]): void {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
	}

	addCard(data: CardInterface): void {
		this.cardCollection.add(data);
	}

	beginReview(): void {
		const now: Date = new Date();
		const cards: Card[] = this.cards.filter((card: Card) => card.data.nextReview < now);
		this._shuffle(cards);
		this.reviewState = new ReviewState({ active: true, cards });
	}

	deleteFromDB(): void {
		this.firestoreDocument.delete();
	}

	toPlainObject(): DeckInterface {
		return {
			name: this.name,
			dateCreated: this.dateCreated,
			lastAddedTo: this.lastAddedTo,
			lastReviewed: this.lastReviewed
		};
	}

	updateDB(): void {
		this.firestoreDocument.update(this.toPlainObject());
	}

}

export interface DeckInterface {
	name: string;
	dateCreated?: string | Date;
	lastAddedTo?: string | Date;
	lastReviewed?: string | Date;
	firestoreDocument?: AngularFirestoreDocument;
}
