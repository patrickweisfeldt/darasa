import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ModalModule } from 'ngx-bootstrap/modal';

import { CoreRoutingModule } from './core-routing.module';
import { CardAddComponent } from './card-add/card-add.component';
import { CardEditComponent } from './card-edit/card-edit.component';
import { CardReviewComponent } from './card-review/card-review.component';
import { CoreComponent } from './core/core.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DeckComponent } from './deck/deck.component';
import { DeckAddComponent } from './deck-add/deck-add.component';
import { DeckDeleteComponent } from './deck-delete/deck-delete.component';
import { DeckEditComponent } from './deck-edit/deck-edit.component';
import { DeckReviewComponent } from './deck-review/deck-review.component';
import { DeckViewComponent } from './deck-view/deck-view.component';


@NgModule({
	declarations: [
		CardAddComponent,
		CardEditComponent,
		CardReviewComponent,
		CoreComponent,
		DashboardComponent,
		DeckComponent,
		DeckAddComponent,
		DeckDeleteComponent,
		DeckEditComponent,
		DeckReviewComponent,
		DeckViewComponent
	],
	imports: [
		CommonModule,
		CoreRoutingModule,
		ModalModule.forRoot(),
		ReactiveFormsModule
	],
	entryComponents: [DeckAddComponent]
})
export class CoreModule { }
