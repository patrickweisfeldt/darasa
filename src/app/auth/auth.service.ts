import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

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

	isLoggedIn: boolean = !!localStorage.getItem('token');

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
	}

	onSuccess(res: any): void {
		console.log('Success :)', res);
		localStorage.setItem('token', res.token);
		this.isLoggedIn = true;
		this.router.navigate(['/dashboard']);
	}

	register(user: object): void {
		this.http.post<any>(urls.register, user, httpOptions).subscribe(
			res => this.onSuccess(res),
			err => console.error('Error :(', err)
		);
	}

}
