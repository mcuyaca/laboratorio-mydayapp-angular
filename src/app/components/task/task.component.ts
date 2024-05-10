import { Component, HostListener, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
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
  inputTask: string = '';
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

  editTask() {
    this.editing = !this.editing;
  }

  saveEditedTask(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.editing = !this.editing;
      const newTitle = this.inputTask.trim();
      console.log(newTitle);
      if (newTitle !== '') {
        this.taskService.updateTask(this.task.id, newTitle);
      }
    }
  }

  toggleCompleted(id: string) {
    this.taskService.toggleTask(id);
  }
}
