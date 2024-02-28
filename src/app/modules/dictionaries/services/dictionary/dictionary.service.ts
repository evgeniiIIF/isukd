import { Injectable, Injector } from '@angular/core';
import { map, Observable } from 'rxjs';

import {
  RecordDataApi,
  mapRecordToModel,
  DictionarySchemaApi,
} from '@dictionaries/models/api';
import {
  DictionarySchema,
  DictionarySchemaField,
  mapDictionarySchemaToModel,
  mapRecordToApiModel,
  RecordData,
} from '@dictionaries/models';
import { DictionaryApiService } from '@dictionaries/services';
import { Paginated, IQueryParams } from '@shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class DictionaryService {
  private dictionaryApiService: DictionaryApiService;

  constructor(private injector: Injector) {
    this.dictionaryApiService = injector.get(DictionaryApiService);
  }

  public getDictionarySchema$(id: number): Observable<DictionarySchema> {
    return this.dictionaryApiService
      .getDictionarySchema$(id)
      .pipe(
        map((data: DictionarySchemaApi) => mapDictionarySchemaToModel(data))
      );
  }

  public getDictionaries$(qp: IQueryParams): Observable<any> {
    return this.dictionaryApiService
      .getDictionaries$(qp)
      .pipe(map((data: any) => data));
  }

  public getRecords$(
    dictionarySchema: DictionarySchema,
    dictionaryId: number,
    qp: IQueryParams
  ): Observable<Paginated<RecordData>> {
    return this.dictionaryApiService.getRecords$(dictionaryId, qp).pipe(
      map((data) => {
        return {
          ...data,
          items: data.items.map((record) =>
            mapRecordToModel(dictionarySchema, record)
          ),
        };
      })
    );
  }

  public getRecord$(
    dictionarySchema: DictionarySchema,
    dictionaryId: number,
    recordId: number
  ): Observable<RecordData> {
    return this.dictionaryApiService
      .getRecord$(dictionaryId, recordId)
      .pipe(
        map((item: RecordDataApi) => mapRecordToModel(dictionarySchema, item))
      );
  }

  public createRecord$(dictionaryId: number, record: any) {
    return this.dictionaryApiService.createRecord$(dictionaryId, record);
  }

  public updateRecord$(
    dictionaryId: number,
    recordId: number,
    recordFields: Array<DictionarySchemaField>,
    record: any
  ) {
    return this.dictionaryApiService.updateRecord$(
      dictionaryId,
      recordId,
      mapRecordToApiModel(recordFields, record)
    );
  }

  public deleteRecord$(
    dictionaryId: number,
    recordId: number
  ): Observable<any> {
    return this.dictionaryApiService.deleteRecord$(dictionaryId, recordId);
  }

  public getMultiLookupField$(
    dictionarySchema: DictionarySchema,
    dictionaryId: number,
    recordId: number,
    qp: IQueryParams
  ): Observable<Paginated<RecordData>> {
    return this.dictionaryApiService
      .getMultiLookupField$(dictionaryId, recordId, qp)
      .pipe(
        map((data) => {
          return {
            ...data,
            items: data.items.map((record) =>
              mapRecordToModel(dictionarySchema, record)
            ),
          };
        })
      );
  }

  public saveMultiLookupField$(
    dictionaryId: number,
    recordId: number,
    fieldName: string,
    data: any
  ) {
    return this.dictionaryApiService.saveMultiLookupField$(
      dictionaryId,
      recordId,
      fieldName,
      data
    );
  }

  public deleteMultiLookupField$(
    dictionaryId: number,
    recordId: number,
    fieldName: string,
    data: any
  ) {
    return this.dictionaryApiService.deleteMultiLookupField$(
      dictionaryId,
      recordId,
      fieldName,
      data
    );
  }

  public getFiles$(
    dictionaryId: number,
    recordId: number,
    qp: IQueryParams
  ): Observable<Paginated<RecordData>> {
    return this.dictionaryApiService.getFiles$(dictionaryId, recordId, qp).pipe(
      map((data) => {
        return {
          ...data,
          items: data.items.map((record) => record.fields),
        };
      })
    );
  }

  public uploadFileForRecord$(
    dictionaryId: number,
    recordId: number,
    fieldName: string,
    file: File
  ): Observable<any> {
    return this.dictionaryApiService.uploadFileForRecord$(
      dictionaryId,
      recordId,
      fieldName,
      file
    );
  }

  public deleteFile$(
    dictionaryId: number,
    recordId: number,
    data: any
  ): Observable<any> {
    return this.dictionaryApiService.deleteFile$(dictionaryId, recordId, data);
  }
}
