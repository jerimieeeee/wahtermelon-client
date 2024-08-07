import {FormControl, FormGroup, Validators} from "@angular/forms";

export function pendingFdxForm() {
  return new FormGroup({
    id: new FormControl<string| null>(null),
    notes_id: new FormControl<string| null>(null),

    icd10_code: new FormControl<string| null>(null)
  });
}
