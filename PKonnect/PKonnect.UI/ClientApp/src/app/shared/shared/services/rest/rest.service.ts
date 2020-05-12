import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) { }

  httpGet(url: string, token?: string): any {
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      })
    };
    if (!!token) {
      return this.http.get<any>(url, options);
    }
    return this.http.get<any>(url);
  }
}
