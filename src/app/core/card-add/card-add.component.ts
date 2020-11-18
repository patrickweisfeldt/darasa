import { Component, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { BsModalRef } from 'ngx-bootstrap/modal';

import { CardInterface } from '../../models/card';

@Component({
	selector: 'app-card-add',
	templateUrl: './card-add.component.html',
	styleUrls: ['./card-add.component.css']
})
export class CardAddComponent {

	constructor(private modalRef: BsModalRef) { }

	cardForm = new FormGroup({
		front: new FormControl('', Validators.required),
		back: new FormControl('', Validators.required),
		tags: new FormControl('')
	});

	event: EventEmitter<CardInterface> = new EventEmitter();

	addCard(): void {
		const cardData = this.cardForm.value;
		cardData.tags = cardData.tags.split(',').map((tag: string) => tag.trim());
		this.event.emit(cardData);
		this.cardForm.reset();
	}

	close(): void {
		this.modalRef.hide();
	}

}
