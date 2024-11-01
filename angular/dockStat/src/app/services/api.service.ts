import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root' // This allows Angular to provide ApiService at the root level
})
export class ApiService {

  private readonly apiUrl = "https://dockstatapi-anni.hetzner.itsnik.de/api-docs";

  constructor(private http: HttpClient) { }

  async get<T>(route: string, params?: any): Promise<T> {
    try {
      return await firstValueFrom(
        this.http
          .get<T>(`${this.apiUrl}/${route}`, { params })
          .pipe(catchError(this.handleError))
      );
    } catch (error) {
      throw error;
    }
  }

  async post<T>(route: string, body: any): Promise<T> {
    try {
      return await firstValueFrom(
        this.http
          .post<T>(`${this.apiUrl}/${route}`, body)
          .pipe(catchError(this.handleError))
      );
    } catch (error) {
      throw error;
    }
  }

  async put<T>(route: string, body: any): Promise<T> {
    try {
      return await firstValueFrom(
        this.http
          .put<T>(`${this.apiUrl}/${route}`, body)
          .pipe(catchError(this.handleError))
      );
    } catch (error) {
      throw error;
    }
  }

  async delete<T>(route: string): Promise<T> {
    try {
      return await firstValueFrom(
        this.http
          .delete<T>(`${this.apiUrl}/${route}`)
          .pipe(catchError(this.handleError))
      );
    } catch (error) {
      throw error;
    }
  }

  private handleError(error: HttpErrorResponse) {
    console.error('API Error:', error);
    return throwError(() => new Error('An error occurred; please try again.'));
  }
}
