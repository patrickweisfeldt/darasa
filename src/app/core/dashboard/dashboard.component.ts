import { Component, OnInit, isDevMode } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { Observable } from 'rxjs';

import { DataService } from '../data.service';
import { Deck } from '../../models';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

	constructor(private data: DataService) { }

	deckList$: Observable<Deck[]>;

	newDeckName: FormControl = new FormControl('', Validators.required);

	add(): void {
		this.data.addDeck(this.newDeckName.value);
		this.newDeckName.setValue('');
	}

	delete(deck: Deck): void {
		this.data.deleteDeck(deck);
	}

	ngOnInit(): void {
		this.deckList$ = this.data.deckListAlphabetical$;
	}

}
