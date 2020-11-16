import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';
import { first } from 'rxjs/operators';

import { environment } from '../../environments/environment';


const baseUrl = environment.apiUrl;
const urls = {
	login: `${baseUrl}/login`,
	register: `${baseUrl}/register`
};
const httpOptions = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json'
	})
};

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	constructor(private http: HttpClient, private router: Router) { }

	private readonly _isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject(!!localStorage.getItem('token'));

	private get isLoggedIn(): boolean {
		return this._isLoggedIn.getValue();
	}

	private set isLoggedIn(value) {
		this._isLoggedIn.next(value);
	}

	readonly isLoggedIn$: Observable<boolean> = this._isLoggedIn.asObservable();

	isLoggedInPromise: Promise<boolean> = this.isLoggedIn$.pipe( first() ).toPromise();

	redirectUrl: string;

	login(user: object): void {
		this.http.post<any>(urls.login, user, httpOptions).subscribe(
			res => this.onSuccess(res),
			err => console.error('Error :(', err)
		);
	}

	logout(): void {
		localStorage.removeItem('token');
		this.isLoggedIn = false;
		this.router.navigate(['/login']);
	}

	onSuccess(res: any): void {
		console.log('Success :)', res);
		localStorage.setItem('token', res.token);
		this.isLoggedIn = true;
		this.router.navigate([this.redirectUrl || '/dashboard']);
		this.redirectUrl = null;
	}

	register(user: object): void {
		this.http.post<any>(urls.register, user, httpOptions).subscribe(
			res => this.onSuccess(res),
			err => console.error('Error :(', err)
		);
	}

}
