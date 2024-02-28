import { Component, Injector, Input, OnInit } from '@angular/core';
import { DictionarySchema } from '../../../../dictionaries/models';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DictionaryService } from '../../../../dictionaries/services';

@Component({
  selector: 'app-multi-lookup-options-modal',
  templateUrl: './multi-lookup-options-modal.component.html',
  styleUrls: ['./multi-lookup-options-modal.component.scss'],
})
export class MultiLookupOptionsModalComponent implements OnInit {
  lookupDictionaryId?: number;
  dictionaryId?: number;
  recordId?: number;
  fieldName?: string;
  dictionarySchema?: DictionarySchema;

  public dialogRef: DynamicDialogRef;

  config: DynamicDialogConfig;

  private dictionaryService: DictionaryService;

  constructor(injector: Injector) {
    this.config = injector.get(DynamicDialogConfig);
    this.dictionaryService = injector.get(DictionaryService);
    this.dialogRef = injector.get(DynamicDialogRef);
  }

  ngOnInit(): void {
    this.dictionaryId = this.config.data['dictionaryId'];
    this.lookupDictionaryId = this.config.data['lookupDictionaryId'];
    this.recordId = this.config.data['recordId'];
    this.fieldName = this.config.data['fieldName'];
    this.dictionarySchema = this.config.data['dictionarySchema'];
  }
}
