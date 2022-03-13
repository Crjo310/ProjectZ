import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) { }

  getRequest(endpoint: String) {
    const baseUrl = 'http://localhost:8080/';
    return this.http.get(baseUrl+endpoint);
  }

  postRequest(endpoint: String, body: any) {
    const baseUrl = 'http://localhost:8080/';
    return this.http.post(baseUrl+endpoint,body);
  }

  postRequestWithOptions(endpoint: String, body: any, options: any) {
    const baseUrl = 'http://localhost:8080/';
    return this.http.post(baseUrl+endpoint,body,options);
  }

}