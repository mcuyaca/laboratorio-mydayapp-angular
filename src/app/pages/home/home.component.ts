import { Component, OnInit } from '@angular/core';
import { Task } from '@models/task.model';
import { TaskService } from '@services/task.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  constructor(private taskService: TaskService) {}

  data: Task[] = [];

  ngOnInit(): void {
    this.taskService.tasksUpdated$.subscribe((tasks) => {
      this.data = tasks;
    });
  }

  newTitle: string = '';

  add() {
    this.data = this.taskService.addTask(this.newTitle);
    this.taskService.updateStorage(this.data);
    this.newTitle = '';
  }
}
