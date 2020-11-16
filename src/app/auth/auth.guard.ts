import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router,
	RouterStateSnapshot, UrlTree } from '@angular/router';

import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

	constructor(private auth: AuthService, private router: Router) { }

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		return this.checkLogin(state.url);
	}

	canActivateChild(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		return this.canActivate(route, state);
	}

	async checkLogin(url: string): Promise<boolean> {
		const loggedIn: boolean = await this.auth.isLoggedInPromise;
		if (loggedIn) {
			return true;
		}
		this.auth.redirectUrl = url;
		this.router.navigate(['/login']);
		return false;
	}

}
