import { AngularFirestoreDocument } from '@angular/fire/firestore';

export class Card {

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
	firestoreDocument: AngularFirestoreDocument;

	constructor(data: CardInterface) {
		this.front = data.front;
		this.back = data.back;
		this.tags = data.tags || [];
		this.data = {
			dateCreated: data.data.dateCreated ? new Date(data.data.dateCreated) : new Date(),
			lastReview: data.data.lastReview ? new Date(data.data.lastReview) : new Date(),
			nextReview: data.data.nextReview ? new Date(data.data.nextReview) : new Date(),
			sessionReviews: data.data.sessionReviews || 0,
			totalReviews: data.data.totalReviews || 0,
			viewsThisSession: data.data.viewsThisSession || 0
		};
		this.firestoreDocument = data.firestoreDocument || null;
	}

	answered(correct: boolean): void {
		this.data.totalReviews++;
		if (correct) {
			this.data.sessionReviews++;
			this.data.viewsThisSession = 0;
			this.data.lastReview = new Date();
			this.calculateNextReview();
			this.updateDB();
		} else {
			this.data.viewsThisSession++;
			this.data.lastReview = new Date();
		}
	}

	calculateNextReview(): void {
		const nextReview: Date = new Date();
		const difference: number = nextReview.getTime() - this.data.lastReview.getTime();
		const msPerDay: number = 1000 * 60 * 60 * 24;
		const increment: number = Math.round(difference / msPerDay) * 2 || 1;
		nextReview.setDate(nextReview.getDate() + increment);
		this.data.nextReview = nextReview;
	}

	deleteFromDB(): void {
		this.firestoreDocument.delete();
	}

	toPlainObject(): CardInterface {
		return {
			front: this.front,
			back: this.back,
			tags: this.tags,
			data: { ...this.data }
		};
	}

	updateDB(): void {
		this.firestoreDocument.update(this.toPlainObject());
	}

}

export interface CardInterface {
	front: string;
	back: string;
	tags?: string[];
	data?: {
		dateCreated?: string | Date;
		lastReview?: string | Date;
		nextReview?: string | Date;
		sessionReviews?: number;
		totalReviews?: number;
		viewsThisSession?: number;
	};
	firestoreDocument?: AngularFirestoreDocument;
}
