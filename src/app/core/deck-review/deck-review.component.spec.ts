import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckReviewComponent } from './deck-review.component';

describe('DeckReviewComponent', () => {
	let component: DeckReviewComponent;
	let fixture: ComponentFixture<DeckReviewComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ DeckReviewComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(DeckReviewComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
