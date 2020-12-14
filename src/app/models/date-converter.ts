import { firestore } from 'firebase';

export class DateConverter {

	_toDate(value: Date | firestore.Timestamp): Date {
		return value instanceof firestore.Timestamp ? value.toDate() : value;
	}

}
