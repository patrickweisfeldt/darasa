import { Component, OnInit } from '@angular/core';

import { User } from 'firebase';

import { Observable } from 'rxjs';

import { AuthService } from '../auth/auth.service';
import { StateService } from '../core/state.service';
import { Deck } from '../models/deck';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

	constructor(
		private auth: AuthService,
		private state: StateService
	) { }

	decks$: Observable<Deck[]>;

	isCollapsed: boolean = true;

	user$: Observable<User>;

	ngOnInit(): void {
		this.user$ = this.auth.user$;
		this.decks$ = this.state.decks$;
	}

	signOut(): void {
		this.auth.signOut();
	}

	toggleCollapse(): void {
		this.isCollapsed = !this.isCollapsed;
	}

}
