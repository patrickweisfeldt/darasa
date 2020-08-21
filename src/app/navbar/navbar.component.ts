import { Component } from '@angular/core';

import { AuthService } from '../auth/auth.service';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

	constructor(private auth: AuthService) { }

	isCollapsed: boolean = true;

	logout(): void {
		this.auth.logout();
	}

	toggleCollapse(): void {
		this.isCollapsed = !this.isCollapsed;
	}

}
