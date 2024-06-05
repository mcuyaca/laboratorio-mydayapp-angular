import { Component, OnInit } from '@angular/core';
import { Task } from '@models/task.model';
import { TaskService } from '@services/task.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  constructor(
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  data: Task[] = [];

  ngOnInit(): void {
    this.taskService.tasksUpdated$.subscribe((tasks) => {
      this.data = tasks;
    });

    const currentUrl = this.router.url;

    function filterTask(task: Task, url: string): boolean {
      switch (url) {
        case '/':
          return true;
        case '/pending':
          return !task.completed;
        case '/completed':
          return task.completed;
        default:
          return false;
      }
    }

    this.data = this.data.filter((task) => filterTask(task, currentUrl));
  }

  newTitle: string = '';

  add() {
    this.data = this.taskService.addTask(this.newTitle);
    this.taskService.updateStorage(this.data);
    this.newTitle = '';
  }
}
