import { Component, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
	selector: 'app-deck-add',
	templateUrl: './deck-add.component.html',
	styleUrls: ['./deck-add.component.css']
})
export class DeckAddComponent {

	constructor(private modalRef: BsModalRef) { }

	event: EventEmitter<string> = new EventEmitter();

	newDeckForm: FormGroup = new FormGroup({
		name: new FormControl('', Validators.required)
	});

	close(): void {
		this.modalRef.hide();
	}

	submit(): void {
		this.event.emit(this.newDeckForm.value.name);
		this.close();
	}

}
