import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { Card } from '../../models/card';
import { Deck } from '../../models/deck';

@Component({
	selector: 'app-deck-review',
	templateUrl: './deck-review.component.html',
	styleUrls: ['./deck-review.component.css']
})
export class DeckReviewComponent implements OnInit {

	constructor(private route: ActivatedRoute) { }

	card: Card;

	deck$: Observable<Deck>;

	ngOnInit(): void {
		this.deck$ = this.route.parent.data.pipe( pluck('deck') );
	}

}
