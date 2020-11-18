import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Resolve,
	Router, RouterStateSnapshot, UrlTree } from '@angular/router';

import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { StateService } from '../core/state.service';

import { Deck } from '../models/deck';


@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, Resolve<Deck> {

	constructor(
		private auth: AuthService,
		private router: Router,
		private state: StateService
	) { }

	async canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Promise<boolean | UrlTree> {
		const loggedIn = await this.auth.loggedIn;
		if (route.data.requireLogin) {
			return loggedIn || this.router.parseUrl(route.data.redirectTo);
		} else {
			return !loggedIn || this.router.parseUrl(route.data.redirectTo);
		}
	}

	async canActivateChild(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Promise<boolean | UrlTree> {
		return this.canActivate(route, state);
	}

	resolve(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<Deck> | Observable<never> {
		const name: string = route.paramMap.get('name');
		return this.state.decks$.pipe(
			take(1),
			mergeMap((decks: Deck[]) => {
				const selected: Deck = decks.find((deck: Deck) => deck.name === name);
				if (selected) {
					return of(selected);
				} else {
					this.router.navigate(['/dashboard']);
					return EMPTY;
				}
			})
		);
	}

}
