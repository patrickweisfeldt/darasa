import { Component, EventEmitter, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
	selector: 'app-deck-add',
	templateUrl: './deck-add.component.html',
	styleUrls: ['./deck-add.component.css']
})
export class DeckAddComponent implements OnInit {

	constructor(private modalRef: BsModalRef) { }

	event: EventEmitter<string> = new EventEmitter();

	get name(): AbstractControl {
		return this.newDeckForm.get('name');
	}

	names: string[] = [];

	newDeckForm: FormGroup = new FormGroup({
		name: new FormControl('',
			[Validators.required, this.nameValidator.bind(this)]
		)
	});

	close(): void {
		this.modalRef.hide();
	}

	nameConverter(name: string): string {
		return name.toLowerCase();
	}

	nameValidator(control: FormControl): ValidationErrors | null {
		return this.names.includes(this.nameConverter(control.value)) ?
			{ nameTaken: true } : null;
	}

	ngOnInit(): void {
		this.names = this.names.map(this.nameConverter);
	}

	submit(): void {
		this.event.emit(this.newDeckForm.value.name);
		this.close();
	}

}
