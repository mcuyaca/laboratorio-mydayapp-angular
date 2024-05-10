import { Component, OnInit } from '@angular/core';
import { Task } from '@models/task.model';
import { TaskService } from '@services/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  constructor(private taskService: TaskService, private router: Router) {}

  data: Task[] = [];

  ngOnInit(): void {
    this.taskService.tasksUpdated$.subscribe((tasks) => {
      this.data = tasks;
    });

    const currentUrl = this.router.url;
    this.data = this.data.filter((task) => {
      if (currentUrl === 'completed') {
      }
    });
  }

  newTitle: string = '';

  add() {
    this.data = this.taskService.addTask(this.newTitle);
    this.taskService.updateStorage(this.data);
    this.newTitle = '';
  }
}
