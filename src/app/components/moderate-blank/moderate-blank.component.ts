import { Component } from '@angular/core';
import { getData, postData } from '../../utils/allUtils';
import { DataService } from '../../data.service';
import { TokensAuth } from '../../interfaces/forms';

@Component({
  selector: 'app-moderate-blank',
  standalone: true,
  imports: [],
  templateUrl: './moderate-blank.component.html',
  styleUrl: './moderate-blank.component.css'
})
export class ModerateBlankComponent {
  tokens: TokensAuth = this.dataService.getUserTokens()

  constructor(private dataService: DataService){
    postData(this.tokens, 'auth/moderateBlank', ).then(data=> {
      console.log(data);
      
    })
  }
}
