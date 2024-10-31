import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly apiUrl = "https://itsnik/dockstatapi.com/";

  constructor(private http: HttpClient) { }

  get<T>(route: string, params?: any): Observable<T> {
    return this.http
      .get<T>(`${this.apiUrl}/${route}`, { params })
      .pipe(catchError(this.handleError));
  }

  post<T>(route: string, body: any): Observable<T> {
    return this.http
      .post<T>(`${this.apiUrl}/${route}`, body)
      .pipe(catchError(this.handleError));
  }

  put<T>(route: string, body: any): Observable<T> {
    return this.http
      .put<T>(`${this.apiUrl}/${route}`, body)
      .pipe(catchError(this.handleError));
  }

  delete<T>(route: string): Observable<T> {
    return this.http
      .delete<T>(`${this.apiUrl}/${route}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.error('API Error:', error);
    return throwError(() => new Error('An error occurred; please try again.'));
  }
}
