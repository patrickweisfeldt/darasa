import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { DataService } from '../data.service';
import { Deck } from '../../models';
import { DeckAddComponent } from '../deck-add/deck-add.component';
import { CardAddComponent } from '../card-add/card-add.component';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

	constructor(
		private data: DataService,
		private modal: BsModalService
	) { }

	deckList$: Observable<Deck[]>;

	modalRef: BsModalRef;

	deleteDeck(deck: Deck): void {
		this.data.deleteDeck(deck);
	}

	ngOnInit(): void {
		this.deckList$ = this.data.deckListAlphabetical$;
	}

	openNewCardModal(deck: Deck): void {
		this.modalRef = this.modal.show(CardAddComponent);
		this.modalRef.content.event.subscribe(
			(cardData: any) => this.data.addCard(deck, cardData)
		);
	}

	openNewDeckModal(): void {
		this.modalRef = this.modal.show(DeckAddComponent);
		this.modalRef.content.event.subscribe(
			(name: string) => this.data.addDeck(name)
		);
	}

}
