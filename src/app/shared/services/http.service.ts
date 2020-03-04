import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {CoreService} from './core.service';
import {Response} from 'src/app/shared/models/response.model';


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  apiUrl = 'https://tmclassanalysis-staging.herokuapp.com/';

  constructor(private http: HttpClient, private core: CoreService) {
  }

  get<T>(path: string, query: string = '', params: HttpParams = new HttpParams()): Observable<Response<T>> {
    return this.http.get<Response<T>>(`${this.apiUrl}${path}?isDeleted=false${query}`, {params})
      .pipe(catchError(e => this.core.handleError(e)));
  }


  getDefault<T>(path: string, params: HttpParams = new HttpParams()): Observable<T> {
    return this.http.get<T>(`${this.apiUrl + path}`, {params})
      .pipe(catchError(e => this.core.handleError(e)));
  }


  getById<T>(path: string, id: any, params: HttpParams = new HttpParams()): Observable<T> {
    const qurey = '?id=' + id;
    return this.http.get<T>(`${this.apiUrl}${path}${qurey}`, {params})
      .pipe(catchError(e => this.core.handleError(e)));
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(`${this.apiUrl}${path}`, body)
      .pipe(catchError(e => this.core.handleError(e)));
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(`${this.apiUrl}${path}`, body)
      .pipe(catchError(e => this.core.handleError(e)));
  }

  delete(path: string, id: string): Observable<any> {
    const qurey = '?id=' + id;
    return this.http.get(`${this.apiUrl}${path}${qurey}`, {})
      .pipe(catchError(e => this.core.handleError(e)));
  }

}
