import { Component, Input } from '@angular/core';
import { TaskService } from '@services/task.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  @Input() length: number = 0;
  constructor(private taskService: TaskService) {}

  clear() {
    this.taskService.clearCompleted();
  }
}
