import { Injectable } from '@angular/core';
import { Task } from '@models/task.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  key: string = 'tasks';
  data: Task[] = this.getStorage();
  tasksUpdated$: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>(
    this.data
  );

  constructor() {}

  getStorage(): Task[] {
    const rawData = localStorage.getItem(this.key);
    return rawData ? JSON.parse(rawData) : [];
  }

  updateStorage(newData: Task[]): void {
    const parseData = JSON.stringify(newData);
    localStorage.setItem(this.key, parseData);
    this.tasksUpdated$.next(newData);
  }

  addTask(newTitle: string): Task[] {
    if (newTitle.trim() === '') return this.data;
    const newTask: Task = {
      id: (this.data.length + 1).toString(),
      title: newTitle,
      completed: false,
    };
    this.data = [...this.data, newTask];
    this.updateStorage(this.data);
    return this.data;
  }

  deleteTask(id: string): void {
    this.data = this.data.filter((task) => task.id !== id);
    this.updateStorage(this.data);
  }

  updateTask(id: string, title: string) {
    this.data = this.data.map((task) =>
      task.id === id ? { ...task, title } : task
    );
    this.updateStorage(this.data);
  }

  toggleTask(id: string) {
    this.data = this.data.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    this.updateStorage(this.data);
  }
}
