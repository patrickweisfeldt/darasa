import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { CardAddComponent } from '../card-add/card-add.component';
import { Card, CardInterface } from '../../models/card';
import { Deck } from '../../models/deck';

@Component({
	selector: 'app-deck-view',
	templateUrl: './deck-view.component.html',
	styleUrls: ['./deck-view.component.css']
})
export class DeckViewComponent implements OnInit {

	constructor(
		private modal: BsModalService,
		private route: ActivatedRoute
	) { }

	deck$: Observable<Deck>;

	modalRef: BsModalRef;

	ngOnInit(): void {
		this.deck$ = this.route.data.pipe( pluck('deck') );
	}

	openNewCardModal(deck: Deck): void {
		this.modalRef = this.modal.show(CardAddComponent);
		this.modalRef.content.event.subscribe((data: CardInterface) => {
			const card: Card = new Card({ ...data });
			deck.addCard(card.toPlainObject());
		});
	}

}
