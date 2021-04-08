import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {
  title: string = '';
  titleMinimumCharactersNumber: string = '8';

  constructor(public todoService: TodoService) { }

  ngOnInit(): void {
  }

  addNewTodo(form: any): void {
    this.todoService.showValidationMsg(form);
    if (form.form.valid) {
      const postTodoBodyRequest = {
        title: this.title
      }
      this.todoService.postTodo(postTodoBodyRequest).subscribe(res => {
      }, err => {
      }, () => {
        form.reset();
        this.title = '';
      })
    }
  }
}
