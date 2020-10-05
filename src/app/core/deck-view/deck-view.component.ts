import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { ActiveDeckService } from '../active-deck.service';
import { Deck } from '../../models';
import { CardAddComponent } from '../card-add/card-add.component';

@Component({
	selector: 'app-deck-view',
	templateUrl: './deck-view.component.html',
	styleUrls: ['./deck-view.component.css']
})
export class DeckViewComponent implements OnInit {

	constructor(
		private activeDeck: ActiveDeckService,
		private modal: BsModalService
	) { }

	deck$: Observable<Deck>;

	modalRef: BsModalRef;

	ngOnInit(): void {
		this.deck$ = this.activeDeck.deck$;
	}

	openNewCardModal(): void {
		this.modalRef = this.modal.show(CardAddComponent);
		this.modalRef.content.event.subscribe(
			(cardData: any) => this.activeDeck.addCard(cardData)
		);
	}

}
