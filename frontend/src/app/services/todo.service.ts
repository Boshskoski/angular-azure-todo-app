import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo, TodoPost, TodoPostResponse } from '../models/Todo';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  titleMinimumCharactersNumber: string = '8';

  constructor(private http: HttpClient) { }
  
  getTodos() : Observable<Todo[]> {
    return this.http.get<Todo[]>(`getTodo`);
  }

  postTodo(postTodoBodyRequest: any) : Observable<TodoPostResponse> {
    return this.http.post<TodoPostResponse>(`postTodo`, postTodoBodyRequest);
  }

  updateTodo(updateTodoBodyPostRequest: TodoPost, updateTodoId: string) : Observable<TodoPostResponse> {
    let options = { params: {} };
    if(updateTodoId) { options.params['id'] = updateTodoId};
    return this.http.post<TodoPostResponse>(`updateTodo`, updateTodoBodyPostRequest, options);
  }

  deleteTodo(deleteTodoId: string) {
    let options = { params: {} };
    if(deleteTodoId) { options.params['id'] = deleteTodoId};
    return this.http.post(`deleteTodo`, {}, options);
  }

  showValidationMsg(formGroup: FormGroup) {
    for (const key in formGroup.controls) {
      if (formGroup.controls.hasOwnProperty(key)) {
        const control: FormControl = <FormControl>formGroup.controls[key];
        if (Object.keys(control).includes('controls')) {
          const formGroupChild: FormGroup = <FormGroup>formGroup.controls[key];
          this.showValidationMsg(formGroupChild);
        }
        control.markAsTouched();
      }
    }
  }
}
