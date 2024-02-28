import {Injectable, Injector} from '@angular/core';
import {LogsApiService} from "./logs-api.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LogsService {
  logsApiService: LogsApiService;

  constructor(injector: Injector) {
    this.logsApiService = injector.get(LogsApiService);
  }

  public getLogs(dictionaryId: number): Observable<any> {
    return this.logsApiService.getLogs(dictionaryId);
  }

  public getLogRecordData(id: number): Observable<any> {
    return this.logsApiService.getLogRecord(id);
  }
}
