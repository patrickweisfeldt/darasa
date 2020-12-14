import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { BsModalRef } from 'ngx-bootstrap/modal';

import { CardInterface } from '../../models/card';

@Component({
	selector: 'app-card-edit',
	templateUrl: './card-edit.component.html',
	styleUrls: ['./card-edit.component.css']
})
export class CardEditComponent implements OnInit {

	constructor(private modalRef: BsModalRef) { }

	cardData: CardInterface;

	cardForm = new FormGroup({
		front: new FormControl('', Validators.required),
		back: new FormControl('', Validators.required),
		tags: new FormControl('')
	});

	cardEdit: EventEmitter<any> = new EventEmitter();

	delete: EventEmitter<null> = new EventEmitter();

	close(): void {
		this.modalRef.hide();
	}

	ngOnInit(): void {
		const initialFormValue = {
			front: this.cardData.front,
			back:  this.cardData.back,
			tags:  this.cardData.tags.join(', ')
		};
		this.cardForm.setValue(initialFormValue);
	}

	saveCard(): void {
		if (!this.cardForm.pristine) {
			const cardData = this.cardForm.value;
			cardData.tags = cardData.tags.split(',').map((tag: string) => tag.trim());
			this.cardEdit.emit(cardData);
		}
		this.modalRef.hide();
	}

}
