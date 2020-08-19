import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs';

import { ActiveDeckService } from '../active-deck.service';
import { Deck } from '../../models';

@Component({
	selector: 'app-card-add',
	templateUrl: './card-add.component.html',
	styleUrls: ['./card-add.component.css']
})
export class CardAddComponent implements OnInit {

	constructor(private activeDeck: ActiveDeckService) { }

	cardForm = new FormGroup({
		front: new FormControl('', Validators.required),
		back: new FormControl('', Validators.required),
		tags: new FormControl('')
	});

	deck$: Observable<Deck>;

	addCard(): void {
		const cardData = this.cardForm.value;
		cardData.tags = cardData.tags.split(',').map((tag: string) => tag.trim());
		this.activeDeck.addCard(cardData);
		this.cardForm.reset();
	}

	ngOnInit(): void {
		this.deck$ = this.activeDeck.deck$;
	}

}
