import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { iif, Observable, of, switchMap, takeWhile, tap } from 'rxjs';
import {
  DictionarySchemaField,
  DictionarySchema,
} from '../../../dictionaries/models';
import { DictionaryService } from '../../../dictionaries/services/dictionary/dictionary.service';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { LogsService } from '../../services/logs.service';
import { CancelToken } from '../../../shared/helpers';

@Component({
  selector: 'app-logs-record-view',
  templateUrl: './logs-record-view.component.html',
  styleUrls: ['./logs-record-view.component.scss'],
})
export class LogsRecordViewComponent implements OnInit, OnDestroy {
  public id: number;
  public dictionaryId: number;

  public dictionarySchema: DictionarySchema | undefined;
  public dictionaryFields: DictionarySchemaField[] | undefined;

  public logRecordData: any;
  public logRecordFields: any;

  public config: DynamicDialogConfig;

  private logsService: LogsService;
  private dictionaryService: DictionaryService;

  public cancelToken = new CancelToken();

  constructor(injector: Injector) {
    this.logsService = injector.get(LogsService);
    this.dictionaryService = injector.get(DictionaryService);
    this.config = injector.get(DynamicDialogConfig);

    this.id = this.config.data['id'];
    this.dictionaryId = this.config.data['dictionaryId'];
  }

  ngOnInit(): void {
    this.getDictionarySchema()
      .pipe(
        switchMap(() => this.getDictionarySchema()),
        switchMap(() => this.getLogRecordData()),
        takeWhile(() => this.cancelToken.isActive)
      )
      .subscribe((data) => {
        if (data) {
          this.setLogRecordData(data);
          this.setLogRecordFields();
        }
      });
  }

  /**
   * Get a dictionary schema by id.
   * @public
   */
  public getDictionarySchema(): Observable<DictionarySchema> {
    return this.dictionaryService.getDictionarySchema$(this.dictionaryId).pipe(
      tap((schema) => {
        this.setDictionarySchema(schema);
        this.setDictionaryFields();
      })
    );
  }

  private setDictionarySchema(schema: DictionarySchema): void {
    this.dictionarySchema = { ...schema };
  }

  private setDictionaryFields(): void {
    this.dictionaryFields = this.dictionarySchema?.fields;
  }

  /**
   * Get a log record data by id.
   * @public
   */
  public getLogRecordData(): Observable<any> {
    return this.logsService.getLogRecordData(this.id);
  }

  public setLogRecordData(data: any): void {
    this.logRecordData = { ...data };
  }

  public setLogRecordFields(): void {
    this.logRecordFields = this.dictionaryFields?.map(
      (field: DictionarySchemaField) => {
        return {
          title: field.title,
          name: field.name,
          oldValue: this.logRecordData?.beforeChangeDataJson[field.name],
          newValue: this.logRecordData?.afterChangeDataJson[field.name],
        };
      }
    );
  }

  public ngOnDestroy(): void {
    this.cancelToken.cancel();
  }
}
