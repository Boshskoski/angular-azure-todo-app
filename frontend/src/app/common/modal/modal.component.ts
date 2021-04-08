import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Todo } from 'src/app/models/Todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input() modalId: string;
  @Input() lastClickedTodo: Todo;
  @Output()
  sendModalResponseEvent = new EventEmitter<any>();
  modalBodyQuestion: string = '';
  modalBodyTitle: string = '';
  callEditTodoHandler: boolean = false;
  updateTodoTitle: string = null;
  updateTodoCompletedStatus: boolean = false;
  titleMinimumCharactersNumber: string = '8';

  constructor(public todoService: TodoService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void { 
    this.lastClickedTodo ? this.updateTodoTitle = this.lastClickedTodo.title : null;
    this.lastClickedTodo ? this.updateTodoCompletedStatus = this.lastClickedTodo.completed : null;
    if (changes.modalId && changes.modalId.currentValue) {
      if (changes.modalId.currentValue == 'editTodo') {
        this.callEditTodoHandler = true;
        this.modalBodyQuestion = 'Are you sure you want to edit this todo task ?';
      } else {
        this.callEditTodoHandler = false;
        this.modalBodyQuestion = 'Are you sure you want to delete this todo task ?';
      }
    }
  }

  updateTodoCompletedHandler(event: Event) {
    const eventValue = (event.target as HTMLSelectElement).value;
    this.updateTodoCompletedStatus = (eventValue == 'true');
  }

  confirm(form: any): void {
    if (form.form.valid) {
      let parentMethodName = '';
      this.callEditTodoHandler ? parentMethodName = 'editTodoHandler' : parentMethodName = 'deleteTodoHandler';
      const sendModalResponseEventObj = {
        parentMethodName
      };
      this.callEditTodoHandler ? sendModalResponseEventObj['updateTodoTitle'] = this.updateTodoTitle : sendModalResponseEventObj['deleteTodoId'] = this.lastClickedTodo.id;
      this.callEditTodoHandler ? sendModalResponseEventObj['updateTodoCompletedStatus'] = this.updateTodoCompletedStatus : null;
      this.sendModalResponseEvent.emit(sendModalResponseEventObj);
    }
  }
}
