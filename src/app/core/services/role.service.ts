import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRole } from '../interfaces/role.interface';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private apiUrl = environment.apiUrl;
  
  constructor(
    private http: HttpClient,
  ) { }

  getRoles = () : Observable<IRole[]> => this.http.get<IRole[]>(`${this.apiUrl}roles/roleList`)
}
