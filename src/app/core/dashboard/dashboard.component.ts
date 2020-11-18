import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { StateService } from '../state.service';
import { CardAddComponent } from '../card-add/card-add.component';
import { DeckAddComponent } from '../deck-add/deck-add.component';
import { DeckDeleteComponent } from '../deck-delete/deck-delete.component';
import { Card, CardInterface } from '../../models/card';
import { Deck } from '../../models/deck';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

	constructor(
		private modal: BsModalService,
		private state: StateService
	) { }

	decks$: Observable<Deck[]>;

	modalRef: BsModalRef;

	ngOnInit(): void {
		this.decks$ = this.state.decks$;
	}

	openDeleteDeckModal(deck: Deck): void {
		this.modalRef = this.modal.show(DeckDeleteComponent, { class: 'modal-sm' });
		this.modalRef.content.event.subscribe((response: boolean) => {
			if (response) { deck.deleteFromDB(); }
		});
	}

	openNewCardModal(deck: Deck): void {
		this.modalRef = this.modal.show(CardAddComponent);
		this.modalRef.content.event.subscribe((data: CardInterface) => {
			const card: Card = new Card({ ...data });
			deck.addCard(card.toPlainObject());
		});
	}

	openNewDeckModal(): void {
		this.modalRef = this.modal.show(DeckAddComponent);
		this.modalRef.content.event.subscribe((name: string) => {
			const deck: Deck = new Deck({ name });
			this.state.addDeck(deck.toPlainObject());
		});
	}

}
