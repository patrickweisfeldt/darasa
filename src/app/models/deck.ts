import { AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { firestore } from 'firebase';

import { map } from 'rxjs/operators';

import { Card, CardInterface } from './card';
import { DateConverter } from './date-converter';
import { ReviewState } from './review-state';


export class Deck extends DateConverter {

	constructor(data: DeckInterface) {
		super();
		this.name = data.name;
		this.cards = [];
		this.dateCreated = data.dateCreated ? this._toDate(data.dateCreated) : new Date();
		this.lastAddedTo = data.lastAddedTo ? this._toDate(data.lastAddedTo) : new Date();
		this.lastReviewed = data.lastReviewed ? this._toDate(data.lastReviewed) : new Date();
		this.firestoreDocument = data.firestoreDocument || null;
		this.reviewState = new ReviewState();
		if (this.firestoreDocument) {
			this.cardCollection = this.firestoreDocument.collection<CardInterface>('cards');
			this.cardCollection.snapshotChanges().pipe(
				map(actions => actions.map(action => {
					const doc = action.payload.doc;
					return new Card({ ...doc.data(), firestoreDocRef: doc.ref });
				}))
			).subscribe(cards => {
				this.cards = cards;
			});
		}
	}

	name: string;
	dateCreated: Date;
	lastAddedTo: Date;
	lastReviewed: Date;

	cardCollection: AngularFirestoreCollection<CardInterface>;
	firestoreDocument: AngularFirestoreDocument;

	reviewState: ReviewState;

	_cards: Card[];

	get cards(): Card[] {
		return this._cards;
	}

	set cards(value: Card[]) {
		this._cards = value.sort(
			(a: Card, b: Card) => a.front.toLowerCase() < b.front.toLowerCase() ? -1 : 1
		);
	}

	get cardsToReview(): number {
		const now: Date = new Date();
		return this.cards.reduce((acc, cur) => {
			const include: number = cur.nextReview < now ? 1 : 0;
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
		this.lastAddedTo = new Date();
		this.updateDB();
	}

	beginReview(): void {
		const now: Date = new Date();
		const cards: Card[] = this.cards.filter((card: Card) => card.nextReview < now);
		if (cards.length) {
			this._shuffle(cards);
			this.reviewState.beginReview(cards);
			this.lastReviewed = now;
			this.updateDB();
		} else {
			this.reviewState.complete = true;
		}
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
	dateCreated?: Date | firestore.Timestamp;
	lastAddedTo?: Date | firestore.Timestamp;
	lastReviewed?: Date | firestore.Timestamp;
	firestoreDocument?: AngularFirestoreDocument;
}
