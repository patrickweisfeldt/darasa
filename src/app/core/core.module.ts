import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CoreRoutingModule } from './core-routing.module';
import { CardAddComponent } from './card-add/card-add.component';
import { CardReviewComponent } from './card-review/card-review.component';
import { CoreComponent } from './core/core.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DeckComponent } from './deck/deck.component';
import { DeckEditComponent } from './deck-edit/deck-edit.component';
import { DeckReviewComponent } from './deck-review/deck-review.component';
import { DeckViewComponent } from './deck-view/deck-view.component';


@NgModule({
	declarations: [
		CardAddComponent,
		CardReviewComponent,
		CoreComponent,
		DashboardComponent,
		DeckComponent,
		DeckEditComponent,
		DeckReviewComponent,
		DeckViewComponent
	],
	imports: [
		CommonModule,
		CoreRoutingModule,
		ReactiveFormsModule
	]
})
export class CoreModule { }
