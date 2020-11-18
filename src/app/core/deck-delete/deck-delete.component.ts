import { Component, EventEmitter } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal';


@Component({
	selector: 'app-deck-delete',
	templateUrl: './deck-delete.component.html',
	styleUrls: ['./deck-delete.component.css']
})
export class DeckDeleteComponent {

	constructor(private modalRef: BsModalRef) { }

	event: EventEmitter<boolean> = new EventEmitter();

	submit(response: boolean): void {
		this.event.emit(response);
		this.modalRef.hide();
	}

}
