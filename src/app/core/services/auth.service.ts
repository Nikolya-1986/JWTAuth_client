import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { map, Observable } from 'rxjs';

import { IResetPassword } from '../interfaces/reset-password.interface';
import { IRegisterRequest } from '../interfaces/register.interface';
import { environment } from '../../../environments/environment';
import { ILoginRequest } from '../interfaces/login.interface';
import { IAuthResponse } from '../interfaces/auth.interface';
import { IChangePassword } from '../interfaces/change-password.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly apiUrl: string = environment.apiUrl;
  private userKey = 'user';

  constructor(private http: HttpClient) {}

  login(data: ILoginRequest): Observable<IAuthResponse> {
    return this.http
      .post<IAuthResponse>(`${this.apiUrl}account/login`, data)
      .pipe(
        map((response) => {
          if (response.isSuccess) {
            localStorage.setItem(this.userKey, JSON.stringify(response));
          }
          return response;
        })
      );
  };

  register(data: IRegisterRequest): Observable<IAuthResponse> {
    return this.http.post<IAuthResponse>(`${this.apiUrl}account/register`, data)
  };

  logout = (): void => {
    localStorage.removeItem(this.userKey);
  };

  getUserDetail = () => {
    const token = this.getToken();
    if (!token) return null;
    const decodedToken: any = jwtDecode(token);
    const userDetail = {
      id: decodedToken.nameid,
      fullName: decodedToken.name,
      email: decodedToken.email,
      roles: decodedToken.role || [],
    };
    return userDetail;
  };

  getRoles = (): string[] | null => {
    const token: any = this.getToken();
    if (!token) return null;
    const decodedToken: any = jwtDecode(token);
    return decodedToken.role || null;
  }

  forgotPassword = (email: string): Observable<IAuthResponse> =>
    this.http.post<IAuthResponse>(`${this.apiUrl}account/forgot-password`, {
      email,
  });

  resetPassword = (data: IResetPassword): Observable<IAuthResponse> =>
    this.http.post<IAuthResponse>(`${this.apiUrl}account/reset-password`, {
      data,
  });

  changePassword = (data: IChangePassword): Observable<IAuthResponse> =>
    this.http.post<IAuthResponse>(`${this.apiUrl}account/change-password`, data);

  getToken = (): string | null => {
    const user = localStorage.getItem(this.userKey);
    if (!user) return null;
    const userDetail: IAuthResponse = JSON.parse(user);
    return userDetail.accessToken;
  };

  getRefreshToken = (): string | null => {
    const user = localStorage.getItem(this.userKey);
    if (!user) return null;
    const userDetail: IAuthResponse = JSON.parse(user);
    return userDetail.refreshToken;
  };

  refreshToken = (data: {
    email: string;
    accessToken: string;
    refreshToken: string;
  }): Observable<IAuthResponse> =>
    this.http.post<IAuthResponse>(`${this.apiUrl}account/refresh-token`, data);

  isLoggedIn = (): boolean => {
    const token = this.getToken();
    if (!token) return false;
    return true;
  };
  
  private isTokenExpired() {
    const token = this.getToken();
    if (!token) return true;
    const decoded = jwtDecode(token);
    const isTokenExpired = Date.now() >= decoded['exp']! * 1000;
    if (isTokenExpired) this.logout();
    return true;
  }
}
