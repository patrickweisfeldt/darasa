import { TestBed } from '@angular/core/testing';

import { StateService } from './state.service';

describe('DataService', () => {
	let service: StateService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(StateService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
