import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/Todo';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  todos$: Observable<Todo[]>;
  modalId: string = '';
  lastClickedTodo: Todo;
  lastClickedTodoId: string = '';

  constructor(private todoService: TodoService) { }

  isThereTodosRespose$: Observable<boolean> = of(false);

  ngOnInit(): void {
    this.getObservableData();
  }

  getObservableData(): void {
    this.todos$ = this.todoService.getTodos();
    this.isThereTodosRespose$ = this.todos$.pipe(map(item => item['response']));
  };

  callModal(modalId: string, todo: Todo): void {
    this.modalId = modalId;
    this.lastClickedTodo = todo;
  }

  modalResponseHandler(sendModalResponseEventObj: any): void {
    if (sendModalResponseEventObj.parentMethodName == 'editTodoHandler') {
      this.editTodoHandler(sendModalResponseEventObj.updateTodoTitle, sendModalResponseEventObj.updateTodoCompletedStatus);
    }
    if (sendModalResponseEventObj.parentMethodName == 'deleteTodoHandler') {
      this.deleteTodoHandler(sendModalResponseEventObj.deleteTodoId);
    }
  }

  editTodoHandler(updateTodoTitle: string, updateTodoCompletedStatus: boolean) {
    let updateTodoBodyPostRequest = {
      title: updateTodoTitle,
      completed: updateTodoCompletedStatus
    };

    this.todoService.updateTodo(updateTodoBodyPostRequest, this.lastClickedTodo.id).subscribe(res => {
    }, err => {
      // this.hideModal('editTodo');
    }, () => {
      this.hideModal('editTodo');
      this.todos$ = this.todoService.getTodos();
    })
  }

  deleteTodoHandler(deleteTodoId: string): void {
    this.todoService.deleteTodo(deleteTodoId).subscribe(res => {
    }, err => {
      // this.hideModal('deleteTodo');
    }, () => {
      this.hideModal('deleteTodo');
      this.getObservableData();
    })
  }

  hideModal(modalId: string): void {
    $(`#${modalId}`).modal('hide');
  }
}
