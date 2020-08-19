import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs';

import { ActiveDeckService } from '../active-deck.service';
import { Deck, Card } from '../../models';

@Component({
	selector: 'app-deck-edit',
	templateUrl: './deck-edit.component.html',
	styleUrls: ['./deck-edit.component.css']
})
export class DeckEditComponent implements OnInit {

	constructor(private activeDeck: ActiveDeckService) { }

	cardDataForm: FormGroup = new FormGroup({
		front: new FormControl('', Validators.required),
		back: new FormControl('', Validators.required),
		tags: new FormControl('')
	});

	deck$: Observable<Deck>;

	editing: Card = null;

	delete(card: Card): void {
		this.activeDeck.deleteCard(card);
	}

	edit(card: Card): void {
		this.editing = card;
		this.cardDataForm.setValue({
			front: card.front,
			back: card.back,
			tags: card.tags.join(', ')
		});
	}

	ngOnInit(): void {
		this.deck$ = this.activeDeck.deck$;
	}

	save(card: Card): void {
		if (!this.cardDataForm.pristine) {
			card.front = this.cardDataForm.value.front;
			card.back  = this.cardDataForm.value.back;
			card.tags  = this.cardDataForm.value.tags.split(',')
				.map((tag: string) => tag.trim());
			this.activeDeck.editCard(card);
		}
		this.editing = null;
	}

	test(card: Card): void {
		console.log(card);
	}

}
