import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { DictionarySchemaField } from '@dictionaries/models';
import { ViewModeEnum } from '@shared/enums';
import { markFormAsTouchedAndDirty, updateFormValidity } from '@shared/helpers';

@Component({
  selector: 'app-dictionary-record-edit',
  templateUrl: './dictionary-record-edit.component.html',
  styleUrls: ['./dictionary-record-edit.component.scss'],
})
export class DictionaryRecordEditComponent implements OnInit {
  @Input() dictionaryId?: number;
  @Input() dictionaryFields?: Array<DictionarySchemaField>;
  @Input() recordId?: number;
  @Input() record?: any;
  @Input() mode?: ViewModeEnum;

  @Output() saveRecordEvent = new EventEmitter();

  form?: FormGroup;

  get viewModeEnum() {
    return ViewModeEnum;
  }

  ngOnInit(): void {
    this.buildFormGroup();
  }

  saveRecord(): void {
    markFormAsTouchedAndDirty(this.form!);
    updateFormValidity(this.form!);

    if (this.form?.valid) {
      const record = {
        fields: { ...this.form!.value },
      };

      this.saveRecordEvent.emit(record);
    }
  }

  private buildFormGroup(): void {
    const group: any = {};

    this.dictionaryFields
      ?.filter((field) => field.type !== 8)
      .forEach((field: DictionarySchemaField) => {
        if (
          (this.mode === this.viewModeEnum.Create && field.isVisibleInAdd) ||
          (this.mode === this.viewModeEnum.Edit && field.isVisibleInEdit)
        ) {
          group[field.name] = new FormControl(
            this.mode === this.viewModeEnum.Edit
              ? this.record[field.name]
              : null,
            field.isRequired ? Validators.required : null
          );
        }
      });

    this.form = new FormGroup(group);

    updateFormValidity(this.form!);
  }
}
