import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { CardEditComponent } from '../card-edit/card-edit.component';
import { Card, CardInterface } from '../../models/card';
import { Deck } from '../../models/deck';

@Component({
	selector: 'app-deck-edit',
	templateUrl: './deck-edit.component.html',
	styleUrls: ['./deck-edit.component.css']
})
export class DeckEditComponent implements OnInit {

	constructor(
		private modal: BsModalService,
		private route: ActivatedRoute
	) { }

	deck$: Observable<Deck>;

	modalRef: BsModalRef;

	ngOnInit(): void {
		this.deck$ = this.route.parent.data.pipe( pluck('deck') );
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
		this.modalRef.content.cardEdit.subscribe((data: CardInterface) => {
			card.front = data.front;
			card.back  = data.back;
			card.tags  = data.tags;
			card.updateDB();
		});
		this.modalRef.content.delete.subscribe(() => {
			card.deleteFromDB();
		});
	}

}
