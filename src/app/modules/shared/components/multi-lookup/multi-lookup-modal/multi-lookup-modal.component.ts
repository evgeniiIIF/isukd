import { Component, OnInit } from '@angular/core';
import { DictionarySchema } from '../../../../dictionaries/models';
import { DictionaryService } from '../../../../dictionaries/services';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-multi-lookup-modal',
  templateUrl: './multi-lookup-modal.component.html',
  styleUrls: ['./multi-lookup-modal.component.scss'],
})
export class MultiLookupModalComponent implements OnInit {
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
    this.getDictionarySchema();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  private getDialogConfigParams() {
    this.dictionaryId = this.config.data['dictionaryId'];
    this.lookupDictionaryId = this.config.data['lookupDictionaryId'];
    this.recordId = this.config.data['recordId'];
    this.fieldName = this.config.data['fieldName'];
  }

  private getDictionarySchema() {
    this.getDictionarySchema$(this.lookupDictionaryId!).subscribe((schema) => {
      this.setDictionarySchema(schema);
    });
  }

  private getDictionarySchema$(id: number) {
    return this.dictionaryService.getDictionarySchema$(id);
  }

  private setDictionarySchema(schema: DictionarySchema): void {
    this.dictionarySchema = { ...schema };
  }
}
