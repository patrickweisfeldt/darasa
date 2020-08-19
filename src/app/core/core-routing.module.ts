import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../auth/auth.guard';
import { CardAddComponent } from './card-add/card-add.component';
import { CoreComponent } from './core/core.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DeckEditComponent } from './deck-edit/deck-edit.component';
import { DeckReviewComponent } from './deck-review/deck-review.component';
import { DeckViewComponent } from './deck-view/deck-view.component';
import { DeckComponent } from './deck/deck.component';


const coreRoutes: Routes = [
	{
		path: 'dashboard',
		component: CoreComponent,
		canActivate: [AuthGuard],
		children: [
			{
				path: 'deck/:name',
				component: DeckComponent,
				children: [
					{ path: 'add', component: CardAddComponent},
					{ path: 'edit', component: DeckEditComponent },
					{ path: 'review', component: DeckReviewComponent },
					{ path: '', component: DeckViewComponent }
				]
			},
			{ path: '', component: DashboardComponent },
			{ path: '**', redirectTo: '' }
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(coreRoutes)],
	exports: [RouterModule]
})
export class CoreRoutingModule { }
