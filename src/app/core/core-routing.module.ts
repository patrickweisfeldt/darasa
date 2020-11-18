import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../auth/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DeckEditComponent } from './deck-edit/deck-edit.component';
import { DeckReviewComponent } from './deck-review/deck-review.component';
import { DeckViewComponent } from './deck-view/deck-view.component';


const coreRoutes: Routes = [
	{
		path: 'dashboard',
		component: DashboardComponent,
		canActivate: [AuthGuard],
		data: { requireLogin: true, redirectTo: '/login'},
		children: [ { path: '**', redirectTo: '' } ]
	},
	{
		path: 'deck/:name',
		component: DeckViewComponent,
		canActivate: [AuthGuard],
		resolve: { deck: AuthGuard },
		data: { requireLogin: true, redirectTo: '/login' },
		children: [
			{ path: 'edit', component: DeckEditComponent },
			{ path: 'review', component: DeckReviewComponent },
			{ path: '**', redirectTo: '' }
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(coreRoutes)],
	exports: [RouterModule]
})
export class CoreRoutingModule { }
