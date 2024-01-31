import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {

  }

  url = 'http://localhost:3000'
  obj = { withCredentials: true }
  
  login(username: any, password: any) {
    return this.http.post(
      this.url + '/user/login', {
      username: username,
      password: password
    },this.obj
    ).pipe()
  }

  signin(username: any, password: any) {
    return this.http.post(
      this.url + '/user/signin', {
      username: username,
      password: password
    },this.obj
    ).pipe();
  }

  logout() {
    return this.http.get(this.url + '/user/logout',this.obj).pipe();
  }

  updatePassword(newPassword: any) {
    return this.http.put(this.url + '/user/updatePassword', {
      newPassword: newPassword
    },this.obj).pipe();
  }

}
