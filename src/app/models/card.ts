import { DocumentReference } from '@angular/fire/firestore';
import { firestore } from 'firebase';

import { DateConverter } from './date-converter';

export class Card extends DateConverter {

	constructor(data: CardInterface) {
		super();
		this.front = data.front;
		this.back = data.back;
		this.tags = data.tags || [];
		this.dateCreated = data.dateCreated ? this._toDate(data.dateCreated) : new Date();
		this.lastReview = data.lastReview ? this._toDate(data.lastReview) : new Date();
		this.nextReview = data.nextReview ? this._toDate(data.nextReview) : new Date();
		this.sessionReviews = data.sessionReviews || 0;
		this.totalReviews = data.totalReviews || 0;
		this.firestoreDocRef = data.firestoreDocRef || null;
	}

	front: string;
	back: string;
	tags: string[];
	dateCreated: Date;
	lastReview: Date;
	nextReview: Date;
	sessionReviews: number;
	totalReviews: number;
	firestoreDocRef: DocumentReference;

	answered(correct: boolean): void {
		this.totalReviews++;
		if (correct) {
			this.sessionReviews++;
			this.lastReview = new Date();
			this.calculateNextReview();
			this.updateDB();
		} else {
			this.lastReview = new Date();
		}
	}

	calculateNextReview(): void {
		const nextReview: Date = new Date();
		const difference: number = nextReview.getTime() - this.lastReview.getTime();
		const msPerDay: number = 1000 * 60 * 60 * 24;
		const increment: number = Math.round(difference / msPerDay) * 2 || 1;
		nextReview.setDate(nextReview.getDate() + increment);
		this.nextReview = nextReview;
	}

	deleteFromDB(): void {
		this.firestoreDocRef.delete();
	}

	toPlainObject(): CardInterface {
		const card: CardInterface = { ...this };
		delete card.firestoreDocRef;
		return card;
	}

	updateDB(): void {
		this.firestoreDocRef.update(this.toPlainObject());
	}

}

export interface CardInterface {
	front: string;
	back: string;
	tags?: string[];
	dateCreated?: Date | firestore.Timestamp;
	lastReview?: Date | firestore.Timestamp;
	nextReview?: Date | firestore.Timestamp;
	sessionReviews?: number;
	totalReviews?: number;
	firestoreDocRef?: DocumentReference;
}
