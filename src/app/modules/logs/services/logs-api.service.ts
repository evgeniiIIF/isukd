import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LogsApiService {
  private baseUrl: string = "/api/v1/Logs";

  constructor(private http: HttpClient) {
  }

  public getLogs(dictionaryId: number): Observable<any> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("dictionaryId", dictionaryId);

    return this.http.get<any>(`${this.baseUrl}/`, {params: queryParams});
  }

  public getLogRecord(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }
}
