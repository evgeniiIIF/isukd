import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { DictionarySchemaApi, RecordDataApi } from '@dictionaries/models/api';
import { getQueryParamsApi, Paginated, IQueryParams } from '@shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class DictionaryApiService {
  private baseUrl: string = '/api/v1/Dictionaries';
  private attachmentsUrl: string = '/api/v1/Attachments';

  constructor(private httpClient: HttpClient) {}

  getDictionarySchema$(dictionaryId: number): Observable<DictionarySchemaApi> {
    // return this.httpClient.get<DictionarySchemaApi>(
    //   `${this.baseUrl}/${dictionaryId}`
    // );
    const fakeData = {
      id: 1,
      title: 'Title 1',
      singleTitle: 'Single Title 1',
      description: 'Description 1',
      dictionaryUsage: [1, 2, 3],
      hierarchical: false,
      settings: {
        cardActionsList: [1, 2, 3],
        resizableGrid: true,
        hiddenListColumns: [2],
        hiddenListMenus: ['hiddenListMenus'],
        // to do
        // fileHandlers: [],
      },
      fields: [
        {
          id: 11,
          guid: 'string',
          title: 'string',
          listTitle: 'string',
          internalName: 'string',
          description: 'string',
          fieldType: 7,
          choices: [],
          hidden: false,
          hiddenListDefault: true,
          listWidth: 200,
          fieldUsage: [1, 2, 3],
          displayMode: 1,
          visibility: [1, 2, 3],
          lookupDictionaryId: 1,
          readOnly: false,
          required: false,
          size: 20,
        },
      ],
    };
    return new Observable((observer) => {
      observer.next(fakeData);
      observer.complete();
    });
  }

  getDictionaries$(qp: IQueryParams): Observable<any> {
    // return this.httpClient.get<any>(
    //   `${this.baseUrl}/all?${getQueryParamsApi(qp)}`
    // );
    const fakeData = {
      items: [
        {
          dictionaryId: 1,
          dictionaryTitle: 'title1',
        },
        {
          dictionaryId: 2,
          dictionaryTitle: 'title2',
        },
        {
          dictionaryId: 3,
          dictionaryTitle: 'title3',
        },
      ],
      page: 1,
      pageSize: 10,
      totalCount: 3,
    };
    return new Observable((observer) => {
      observer.next(fakeData);
      observer.complete();
    });
  }

  getRecords$(
    dictionaryId: number,
    qp: IQueryParams
  ): Observable<Paginated<RecordDataApi>> {
    // return this.httpClient.get<Paginated<RecordDataApi>>(
    //   `${this.baseUrl}/${dictionaryId}/items?${getQueryParamsApi(qp)}`
    // );
    const fakeData = {
      pageIndex: 1,
      pageSize: 10,
      totalCount: 10,
      totalPages: 10,
      hasPreviousPage: false,
      hasNextPage: true,
      items: [
        {
          lookupFields: [
            {
              lookupName: 'lookupName',
              fields: {
                _ID_: 1,
                Title: 'Title',
              },
            },
          ],
          fields: {
            _ID_: 1,
            _CREATE_DATE_: new Date(),
            _MODIFY_DATE_: new Date(),
          },
        },
      ],
    };
    return new Observable((observer) => {
      observer.next(fakeData);
      observer.complete();
    });
  }

  getRecord$(
    dictionaryId: number,
    recordId: number
  ): Observable<RecordDataApi> {
    return this.httpClient.get<RecordDataApi>(
      `${this.baseUrl}/${dictionaryId}/items/${recordId}`
    );
  }

  createRecord$(dictionaryId: number, record: any): Observable<any> {
    return this.httpClient.post<any>(
      `${this.baseUrl}/${dictionaryId}/items/create`,
      record
    );
  }

  updateRecord$(
    dictionaryId: number,
    recordId: number,
    record: any
  ): Observable<any> {
    return this.httpClient.patch<any>(
      `${this.baseUrl}/${dictionaryId}/items/${recordId}`,
      record
    );
  }

  deleteRecord$(dictionaryId: number, recordId: number): Observable<any> {
    return this.httpClient.delete<any>(
      `${this.baseUrl}/${dictionaryId}/${recordId}`
    );
  }

  public getMultiLookupField$(
    dictionaryId: number,
    recordId: number,
    qp: IQueryParams
  ): Observable<Paginated<RecordDataApi>> {
    return this.httpClient.get<Paginated<RecordDataApi>>(
      `${
        this.baseUrl
      }/${dictionaryId}/${recordId}/multiLookupFieldValue?${getQueryParamsApi(
        qp
      )}`
    );
  }

  public saveMultiLookupField$(
    dictionaryId: number,
    recordId: number,
    fieldName: string,
    data: any
  ) {
    return this.httpClient.patch<any>(
      `${this.baseUrl}/${dictionaryId}/${recordId}/multiLookupField/${fieldName}`,
      data
    );
  }

  public deleteMultiLookupField$(
    dictionaryId: number,
    recordId: number,
    fieldName: string,
    data: any
  ) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data,
    };

    return this.httpClient.delete<any>(
      `${this.baseUrl}/${dictionaryId}/${recordId}/multiLookupField/${fieldName}`,
      options
    );
  }

  public getFiles$(
    dictionaryId: number,
    recordId: number,
    qp: IQueryParams
  ): Observable<Paginated<RecordDataApi>> {
    return this.httpClient.get<Paginated<RecordDataApi>>(
      `${this.attachmentsUrl}/${dictionaryId}/${recordId}?${getQueryParamsApi(
        qp
      )}`
    );
  }

  public uploadFileForRecord$(
    dictionaryId: number,
    recordId: number,
    fieldName: string,
    file: File
  ): Observable<any> {
    const formData: any = new FormData();
    formData.append('File', file);

    return this.httpClient.post<any>(
      `${this.attachmentsUrl}/${dictionaryId}/${recordId}/uploadFile/${fieldName}`,
      formData
    );
  }

  public deleteFile$(
    dictionaryId: number,
    recordId: number,
    data: any
  ): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data,
    };

    return this.httpClient.delete<any>(
      `${this.attachmentsUrl}/${dictionaryId}/${recordId}`,
      options
    );
  }
}
