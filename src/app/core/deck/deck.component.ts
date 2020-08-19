import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ActiveDeckService } from '../active-deck.service';

@Component({
	selector: 'app-deck',
	templateUrl: './deck.component.html',
	styleUrls: ['./deck.component.css'],
	providers: [ActiveDeckService]
})
export class DeckComponent implements OnInit {

	constructor(
		private activeDeck: ActiveDeckService,
		private route: ActivatedRoute
	) { }

	ngOnInit(): void {
		this.activeDeck.getRouteParams(this.route.paramMap);
	}

}
