import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-modal-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-notification.component.html',
  styleUrl: './modal-notification.component.css'
})
export class ModalNotificationComponent {
@Input() data:any;
}
