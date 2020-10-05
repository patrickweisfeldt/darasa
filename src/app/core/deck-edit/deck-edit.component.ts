import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { ActiveDeckService } from '../active-deck.service';
import { CardEditComponent } from '../card-edit/card-edit.component';
import { Deck, Card } from '../../models';

@Component({
	selector: 'app-deck-edit',
	templateUrl: './deck-edit.component.html',
	styleUrls: ['./deck-edit.component.css']
})
export class DeckEditComponent implements OnInit {

	constructor(
		private activeDeck: ActiveDeckService,
		private modal: BsModalService
	) { }

	deck$: Observable<Deck>;

	modalRef: BsModalRef;

	delete(card: Card): void {
		this.activeDeck.deleteCard(card);
	}

	ngOnInit(): void {
		this.deck$ = this.activeDeck.deck$;
	}

	openEditCardModal(card: Card): void {
		const initialState = {
			cardData: {
				front: card.front,
				back:  card.back,
				tags:  card.tags
			}
		};
		this.modalRef = this.modal.show(CardEditComponent, { initialState });
		this.modalRef.content.event.subscribe((cardData: any) => {
			card.front = cardData.front;
			card.back  = cardData.back;
			card.tags  = cardData.tags;
			this.activeDeck.editCard(card);
		});
	}

}
