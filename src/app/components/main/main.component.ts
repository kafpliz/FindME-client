import { Component } from '@angular/core';
import { DataService } from '../../data.service';
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  userToken:string = ''

  constructor(private dataService: DataService) {
      this.userToken = dataService.getUserToken()
  }

}
