import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { AuthService } from '../auth/auth.service';
import { DataService } from '../core/data.service';
import { Deck } from '../models';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

	constructor(
		private auth: AuthService,
		private data: DataService
	) { }

	deckList$: Observable<Deck[]>;

	isCollapsed: boolean = true;

	isLoggedIn$: Observable<boolean>;

	logout(): void {
		this.auth.logout();
	}

	ngOnInit(): void {
		this.isLoggedIn$ = this.auth.isLoggedIn$;
		this.deckList$ = this.data.deckList$;
	}

	toggleCollapse(): void {
		this.isCollapsed = !this.isCollapsed;
	}

}
