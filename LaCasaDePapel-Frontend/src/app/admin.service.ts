import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Admin } from 'src/admin';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private adminUrl = 'http://localhost:8086/api/admin/login';
  constructor(private http: HttpClient ) { }
  loginAdmin(admin: Admin): Observable<Admin> {
    return this.http.post<Admin>(this.adminUrl, admin);
  }
}
