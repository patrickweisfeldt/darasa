import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { ActiveDeckService } from '../active-deck.service';
import { Deck } from '../../models';

@Component({
	selector: 'app-deck-view',
	templateUrl: './deck-view.component.html',
	styleUrls: ['./deck-view.component.css']
})
export class DeckViewComponent implements OnInit {

	constructor(private activeDeck: ActiveDeckService) { }

	deck$: Observable<Deck>;

	ngOnInit(): void {
		this.deck$ = this.activeDeck.deck$;
	}

}
