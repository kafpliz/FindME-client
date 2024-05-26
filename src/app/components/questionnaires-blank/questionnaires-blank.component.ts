import { Component, Input } from '@angular/core';
import { Human } from '../../interfaces/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-questionnaires-blank',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './questionnaires-blank.component.html',
  styleUrl: './questionnaires-blank.component.css'
})
export class QuestionnairesBlankComponent {
  @Input() blank?: Human

  
}
