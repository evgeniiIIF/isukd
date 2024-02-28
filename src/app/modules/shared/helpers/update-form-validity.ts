import { AbstractControl, FormGroup } from '@angular/forms';

export function updateFormValidity(control: FormGroup | AbstractControl): void {
  control.updateValueAndValidity();
  if (control instanceof FormGroup) {
    for (const key of Object.keys(control.controls)) {
      updateFormValidity(control.controls[key]);
    }
  }
}
