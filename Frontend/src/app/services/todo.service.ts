import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }
  url = 'http://localhost:3000'
  obj = { withCredentials: true }
  
  todo() {
    return this.http.get<[]>(
      this.url + '/todo/todo', this.obj).pipe()
  }

  create(title: any, description: any) {
    return this.http.post(
      this.url + '/todo/create', {
      title: title,
      description: description
    }, this.obj
    ).pipe()
  }

  edit(title: any, description: any, uniqueID: any) {
    return this.http.put(
      this.url + `/todo/edit/${uniqueID}`, {
      title: title,
      description: description
    }, this.obj
    ).pipe()
  }

  delete(uniqueID: any) {
    return this.http.delete(
      this.url + `/todo/delete/${uniqueID}`, this.obj
    ).pipe()
  }

  due(uniqueID: any) {
    return this.http.put(
      this.url + `/todo/due/${uniqueID}`,{}, this.obj
    ).pipe()
  }

  done(uniqueID: any) {
    return this.http.put(
      this.url + `/todo/done/${uniqueID}`, {}, this.obj).pipe()
  }

  completed() {
    return this.http.get<[]>(
      this.url + '/todo/completed', this.obj).pipe()
  }

}
