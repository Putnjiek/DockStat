import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, map, Observable } from 'rxjs';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root' // This allows Angular to provide ApiService at the root level
})
export class ApiService {

  private readonly apiUrl = "https://dockstatapi-anni.hetzner.itsnik.de";

  headerPermission$ = new BehaviorSubject(0);

  success$ = new BehaviorSubject("");

  failure$ = new BehaviorSubject("");

  constructor(private http: HttpClient) { }

  public get<T = void>(route: string, options?: any): Promise<T> {
    return this.request(route, options, (url, headers) => this.http.get<T>(url, {
      headers,
      observe: "response"
    }).pipe(map(response => {
      const newPermissions = response.headers.get("x-password");
      if (newPermissions) {
        this.headerPermission$.next(Number(newPermissions));
      }

      return response.body!;
    }), catchError<T, Observable<T>>(error => {
      const newPermissions = error.headers.get("x-password");
      if (newPermissions) {
        this.headerPermission$.next(Number(newPermissions));
      }

      return error.body!;
    })));
  }

  public post<T = void>(route: string, options?: any): Promise<T> {
    return this.request(route, options, (url, headers) => this.http.get<T>(url, {
      headers,
      observe: "response"
    }).pipe(map(response => {
      const newPermissions = response.headers.get("x-password");
      if (newPermissions) {
        this.headerPermission$.next(Number(newPermissions));
      }

      return response.body!;
    }), catchError<T, Observable<T>>(error => {
      const newPermissions = error.headers.get("x-password");
      if (newPermissions) {
        this.headerPermission$.next(Number(newPermissions));
      }

      return error.body!;
    })));
  }

  public put<T = void>(route: string, options?: any): Promise<T> {
    return this.request(route, options, (url, headers) => this.http.get<T>(url, {
      headers,
      observe: "response"
    }).pipe(map(response => {
      const newPermissions = response.headers.get("x-password");
      if (newPermissions) {
        this.headerPermission$.next(Number(newPermissions));
      }

      return response.body!;
    }), catchError<T, Observable<T>>(error => {
      const newPermissions = error.headers.get("x-password");
      if (newPermissions) {
        this.headerPermission$.next(Number(newPermissions));
      }

      return error.body!;
    })));
  }

  public delete<T = void>(route: string, options?: any): Promise<T> {
    return this.request(route, options, (url, headers) => this.http.get<T>(url, {
      headers,
      observe: "response"
    }).pipe(map(response => {
      const newPermissions = response.headers.get("x-password");
      if (newPermissions) {
        this.headerPermission$.next(Number(newPermissions));
      }

      return response.body!;
    }), catchError<T, Observable<T>>(error => {
      const newPermissions = error.headers.get("x-password");
      if (newPermissions) {
        this.headerPermission$.next(Number(newPermissions));
      }

      return error.body!;
    })));
  }

  private async request<T>(route: string, options: any | undefined, fn: (url: string, headers: HttpHeaders) => Observable<T>): Promise<T> {
    const url = this.createUrl(route, options);
    //TODO: right headers
    // const headers = this.createHeaders(options);

    const headers = new HttpHeaders();

    try {
      let response: T;
      if (options?.mockResponse) {
        console.debug("discarding request, using mock response");
        response = options.mockResponse;
      } else {
        response = await firstValueFrom(fn(url, headers));
      }

      this.success$.next(route);

      return response;
    } catch (cause) {
      console.error(cause);
      this.failure$.next(route);

      throw new Error(`Request failure at ${route}, ${cause}`);
    }
  }

  private createUrl(route: string, options: any | undefined): string {
    let url = `${this.apiUrl}/${route}`;

    if (options?.queryParams) {
      const queryParams = new URLSearchParams(options.queryParams).toString();
      url += `?${queryParams}`;
    }

    return url;
  }

  private createHeaders(options: any | undefined): HttpHeaders {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-password': 'test'
    });

    if (options?.addAuthorization) {
      headers = headers.set('Authorization', `Bearer ${options.authToken}`);
    }

    if (options?.headers) {
      for (const key of Object.keys(options.headers)) {
        headers = headers.set(key, options.headers[key]);
      }
    }

    return headers;
  }

}
