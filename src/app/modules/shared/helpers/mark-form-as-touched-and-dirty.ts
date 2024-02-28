import { AbstractControl, FormGroup } from '@angular/forms';

export function markFormAsTouchedAndDirty(
  control: FormGroup | AbstractControl
): void {
  control.markAsTouched();
  control.markAsDirty();

  if (control instanceof FormGroup) {
    for (const key of Object.keys(control.controls)) {
      markFormAsTouchedAndDirty(control.controls[key]);
    }
  }
}
