import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckDeleteComponent } from './deck-delete.component';

describe('DeckDeleteComponent', () => {
	let component: DeckDeleteComponent;
	let fixture: ComponentFixture<DeckDeleteComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ DeckDeleteComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(DeckDeleteComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
