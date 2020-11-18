import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';


const routes: Routes = [
	{
		path: 'login',
		component: LoginComponent,
		canActivate: [AuthGuard],
		data: { requireLogin: false, redirectTo: '/dashboard'}
	},
	{
		path: 'register',
		component: RegisterComponent,
		canActivate: [AuthGuard],
		data: { requireLogin: false, redirectTo: '/dashboard'}
	},
	{
		path: '',
		redirectTo: 'login',
		pathMatch: 'full'
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
