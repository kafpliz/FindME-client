import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { DataService } from './data.service';
import { CommonModule } from '@angular/common';
import { ProfileModalComponent } from './modal/profile-modal/profile-modal.component';
import { profileEnterAnimation, profileLeaveAnimation } from './animations/allAnimation';
import { MainHeaderComponent } from './components/main-header/main-header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule, ProfileModalComponent, MainHeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [profileEnterAnimation, profileLeaveAnimation]
})
export class AppComponent {
  profileModal: boolean = false
  isUserToken: boolean | string = false
  userData:any;


  constructor(private dataService: DataService) {
    this.isUserToken = dataService.accessToken
    this.userData = dataService.getUserData()

    dataService.dataChanged.subscribe((data)=> {
      this.userData = data.data 
      
      
    })
  }
  ngOnInit() {
  
  }
  
 
}
