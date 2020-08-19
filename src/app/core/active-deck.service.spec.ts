import { TestBed } from '@angular/core/testing';

import { ActiveDeckService } from './active-deck.service';

describe('ActiveDeckService', () => {
	let service: ActiveDeckService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(ActiveDeckService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
