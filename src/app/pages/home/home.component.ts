import { Component, OnInit } from '@angular/core';
import { Task } from '@models/task.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  constructor() {}

  data: Task[] = [];

  newTitle: string = '';
  addTask() {
    if (this.newTitle.trim() === '') return;
    const newTask: Task = {
      id: this.data.length.toString(),
      title: this.newTitle,
      completed: false,
    };
    this.data = [...this.data, newTask];
    this.newTitle = '';
  }

  deleteTask(id: string) {
    this.data.filter((value, index) => index !== Number(id));
  }
}
