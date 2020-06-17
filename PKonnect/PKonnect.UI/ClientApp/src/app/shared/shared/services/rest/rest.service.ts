import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) { }

  httpGet(url: string, token?: string): any {
    const options = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      }),
      responseType: 'blob' as 'blob'
    };
    if (!!token) {
      return this.http.request('GET', url, options);
    }
    return this.http.get<any>(url);
  }

}
