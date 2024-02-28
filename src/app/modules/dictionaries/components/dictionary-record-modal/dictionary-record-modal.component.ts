import { Component, OnInit } from '@angular/core';
import { defer, of, switchMap } from 'rxjs';

import { DictionaryRecordBaseComponent } from '@dictionaries/components';
import { DictionaryService } from '@dictionaries/services';
import { ViewModeEnum } from '@shared/enums';

import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { RecordData } from '@dictionaries/models';

@Component({
  selector: 'app-dictionary-record-modal',
  templateUrl: './dictionary-record-modal.component.html',
  styleUrls: ['./dictionary-record-modal.component.scss'],
})
export class DictionaryRecordModalComponent
  extends DictionaryRecordBaseComponent
  implements OnInit
{
  get viewModeEnum() {
    return ViewModeEnum;
  }

  constructor(
    private dialogRef: DynamicDialogRef,
    private config: DynamicDialogConfig,
    dictionaryService: DictionaryService
  ) {
    super(dictionaryService);
  }

  ngOnInit(): void {
    this.isLoading = true;

    this.recordId = this.config.data['id'];
    this.dictionaryId = this.config.data['dictionaryId'];
    this.mode = this.config.data['mode'];

    this.getDictionarySchema$(this.dictionaryId!)
      .pipe(
        switchMap(() =>
          defer(() =>
            this.mode !== this.viewModeEnum.Create
              ? this.getRecord$()
              : of(null)
          )
        )
      )
      .subscribe((data) => {
        if (data) {
          this.setRecord(data);
        }

        this.isLoading = false;
      });
  }

  saveRecord(record: RecordData): void {
    defer(() =>
      !!this.recordId
        ? this.dictionaryService.updateRecord$(
            this.dictionaryId!,
            this.recordId,
            this.dictionaryFields!,
            record
          )
        : this.dictionaryService.createRecord$(this.dictionaryId!, record)
    ).subscribe((_) => {
      this.closeDialog();
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
