import { Component, HostListener, Input } from '@angular/core';
import { Task } from '@models/task.model';
import { TaskService } from '@services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent {
  @Input() task: Task = {
    id: '',
    title: '',
    completed: false,
  };

  editing = false;

  @HostListener('window:keydown.esc', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (this.editing) {
      this.editing = false;
    }
  }

  constructor(private taskService: TaskService) {}

  handleDeleteClick(id: string) {
    this.taskService.deleteTask(id);
  }

  handleEdit(title: string) {
    this.editing = !this.editing;
    this.taskService.updateTask(this.task.id, 'titulo nuevo');
  }

  toggleCompleted(id: string) {
    this.taskService.toggleTask(id);
  }
}
