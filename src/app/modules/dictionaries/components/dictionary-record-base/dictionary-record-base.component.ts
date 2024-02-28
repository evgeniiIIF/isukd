import { Component, OnDestroy } from '@angular/core';
import { Observable, takeWhile, tap } from 'rxjs';

import { DictionaryService } from '@dictionaries/services';
import {
  DictionarySchemaField,
  DictionarySchema,
  RecordData,
} from '@dictionaries/models';
import { ViewModeEnum } from '@shared/enums';

import { CancelToken } from '@shared/helpers';

@Component({
  selector: 'app-dictionary-record-base',
  template: ``,
})
export class DictionaryRecordBaseComponent implements OnDestroy {
  dictionaryId?: number;
  dictionarySchema?: DictionarySchema;
  dictionaryFields?: DictionarySchemaField[];
  recordId?: number;
  record?: RecordData;

  mode?: ViewModeEnum;

  isLoading: boolean = false;
  cancelToken = new CancelToken();

  dictionaryService: DictionaryService;

  constructor(dictionaryService: DictionaryService) {
    this.dictionaryService = dictionaryService;
  }

  getDictionarySchema$(dictionaryId: number): Observable<DictionarySchema> {
    return this.dictionaryService.getDictionarySchema$(dictionaryId).pipe(
      takeWhile(() => this.cancelToken.isActive),
      tap((schema) => {
        this.setDictionarySchema(schema);
        this.setDictionaryFields(schema);
      })
    );
  }

  getRecord$(): Observable<RecordData> {
    return this.dictionaryService
      .getRecord$(this.dictionarySchema!, this.dictionaryId!, this.recordId!)
      .pipe(takeWhile(() => this.cancelToken.isActive));
  }

  setRecord(data: RecordData): void {
    this.record = { ...data };
  }

  setDictionarySchema(schema: DictionarySchema): void {
    this.dictionarySchema = { ...schema };
  }

  ngOnDestroy(): void {
    this.cancelToken.cancel();
  }

  private setDictionaryFields(schema: DictionarySchema): void {
    this.dictionaryFields = [...schema.fields];
  }
}
