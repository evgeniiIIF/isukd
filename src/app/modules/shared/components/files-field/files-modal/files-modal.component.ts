import { Component, OnInit } from '@angular/core';
import { DictionarySchema } from '@dictionaries/models';
import { DictionaryService } from '@dictionaries/services';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-files-modal',
  templateUrl: './files-modal.component.html',
  styleUrls: ['./files-modal.component.scss'],
})
export class FilesModalComponent implements OnInit {
  lookupDictionaryId?: number;
  dictionaryId?: number;
  recordId?: number;
  fieldName?: string;

  dictionarySchema?: DictionarySchema;

  constructor(
    private dictionaryService: DictionaryService,
    private config: DynamicDialogConfig,
    private dialogRef: DynamicDialogRef
  ) {}

  ngOnInit(): void {
    this.getDialogConfigParams();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  private getDialogConfigParams() {
    this.dictionaryId = this.config.data['dictionaryId'];
    this.recordId = this.config.data['recordId'];
    this.fieldName = this.config.data['fieldName'];
  }
}
