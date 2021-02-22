import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { User } from 'firebase';

import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from '../auth/auth.service';
import { Deck, DeckInterface } from '../models/deck';


@Injectable({
	providedIn: 'root'
})
export class StateService {

	constructor(
		private auth: AuthService,
		private db: AngularFirestore
	) {
		this.auth.user$.subscribe((user: User) => {
			if (user) {
				this.deckCollection = this.db.doc(`users/${user.uid}`).collection<DeckInterface>('decks');
				this.deckCollection.valueChanges({ idField: 'id' }).pipe(
					map(data => data.map(deck => {
						return new Deck({ ...deck, firestoreDocument: this.deckCollection.doc(deck.id) });
					}))
				).subscribe((decks: Deck[]) => this.decks = decks);
			}
		});
	}

	private readonly _decks: BehaviorSubject<Deck[]> = new BehaviorSubject( [] );

	public readonly decks$: Observable<Deck[]> = this._decks.asObservable();

	private get decks(): Deck[] {
		return this._decks.getValue();
	}

	private set decks(value: Deck[]) {
		this._decks.next(value);
	}

	deckCollection: AngularFirestoreCollection<DeckInterface>;

	addDeck(deck: DeckInterface): void {
		this.deckCollection.add(deck);
	}

	getDecks(): Deck[] {
		return this.decks;
	}

}
