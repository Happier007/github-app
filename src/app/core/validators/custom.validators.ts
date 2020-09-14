// ANGULAR
import { FormControl } from '@angular/forms';

export class CustomValidators {

  static objectType(control: FormControl): { [key: string]: boolean } {

    if (typeof control.value !== 'object') {
      return {notObject: true};
    }
    return null;
  }
}
