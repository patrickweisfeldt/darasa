import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckAddComponent } from './deck-add.component';

describe('DeckAddComponent', () => {
	let component: DeckAddComponent;
	let fixture: ComponentFixture<DeckAddComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ DeckAddComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(DeckAddComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
