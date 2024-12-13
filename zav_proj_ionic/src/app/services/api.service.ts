import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,throwError  } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
 
  private baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error('Access token is missing');
      
    }
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      'ngrok-skip-browser-warning': 'true',
    });
  }
  private getDefaultHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': 'true',
    });
  }
  register(userData: { email: string; password: string }): Observable<any> {
    const url = `${this.baseUrl}/register`;
    return this.http.post(url, userData, { headers: this.getDefaultHeaders() });
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    const url = `${this.baseUrl}/login`;
    return this.http.post(url, credentials, { headers: this.getDefaultHeaders()  });
  }

  validateToken(): Observable<any> {
    const token = localStorage.getItem('access_token');
    if (!token) {
      return throwError(() => new Error('Access token is missing'));
    }
    const url = `${this.baseUrl}/protected`;
    return this.http.get(url, { headers: this.getAuthHeaders() });
  }
  sendMessage(request: string, apiEndpoint: string): Observable<any> {
    const url = `${this.baseUrl}/${apiEndpoint}`; 
    return this.http.post<any>(url, { request }, { headers: this.getAuthHeaders() });
  }
  getNews(apiEndpoint: string):  Observable<any> {
    const url = `${this.baseUrl}/${apiEndpoint}`; 
    return this.http.get<any>(url,{ headers: this.getAuthHeaders() })
  }

  getUserProfile(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get<any>(`${this.baseUrl}/profile`, { headers });
  }

  updateUserProfile(user: { name: string; email: string; password: string }): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put<any>(`${this.baseUrl}/profile`, user, { headers });
  }
  deleteUserAccount(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete<any>(`${this.baseUrl}/profile`, { headers });
  }
  translateMassage(textToTranslate: string,from: string,to: string,apiEndpoint:string): Observable<any>{
    const url = `${this.baseUrl}/${apiEndpoint}`; 
    return this.http.post<any>(url, {text: textToTranslate,source_lang:from,target_lang:to}, { headers: this.getAuthHeaders() });
  }
}
