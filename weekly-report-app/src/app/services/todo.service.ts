import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo';


@Injectable({
  providedIn: 'root'
})
export class TodoService {
baseUrl: string = 'https://jsonplaceholder.typicode.com/todos';
constructor(private http: HttpClient) { }

  getTodos(): Observable<Todo[]>{
    return this.http.get<Todo[]>(this.baseUrl)
  }

  // deleteAll(): Observable<any> {
  //   return this.http.delete(this.baseUrl);
  // }

  // findByCode(code): Observable<any> {
  //   return this.http.get(`${this.baseUrl}?code=${code}`);
  // }
 
}
