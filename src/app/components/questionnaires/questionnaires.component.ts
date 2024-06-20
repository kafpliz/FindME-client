import { Component } from '@angular/core';
import { QuestionnairesBlankComponent } from '../questionnaires-blank/questionnaires-blank.component';
import axios from 'axios';
import { CommonModule } from '@angular/common';
import { Human } from '../../interfaces/forms';
import { RouterLink } from '@angular/router';
import { getData, postData } from '../../utils/allUtils';

@Component({
  selector: 'app-questionnaires',
  standalone: true,
  imports: [QuestionnairesBlankComponent, CommonModule,RouterLink],
  templateUrl: './questionnaires.component.html',
  styleUrl: './questionnaires.component.css'
})
export class QuestionnairesComponent {
  blanks: Human[] = [];

  ngOnInit(): void {
   

    getData('form/get?type=human').then(data => {
      console.log(data);
    
      for (const item of data) {
      item.img = item.img.split(',').map((i: any) => i.trim())
       item.time = item.time.slice(0, 10)
      }
      this.blanks = data

    })





  }

}
