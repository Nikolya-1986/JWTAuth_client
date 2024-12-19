import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserDetail } from '../interfaces/user-detail.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly apiUrl: string = environment.apiUrl;
  
  constructor(
    private http: HttpClient
  ) { }

  getDetail = (): Observable<IUserDetail> => 
    this.http.get<IUserDetail>(`${this.apiUrl}user/detail`);
}
