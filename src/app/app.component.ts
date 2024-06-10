import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { DataService } from './data.service';
import { CommonModule } from '@angular/common';
import { ProfileModalComponent } from './modal/profile-modal/profile-modal.component';
import { profileEnterAnimation, profileLeaveAnimation } from './animations/allAnimation';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule, ProfileModalComponent],
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
  
  checkprofile() {
    
    if (this.profileModal == true) {
      this.profileModal = false
    } else {
      this.profileModal = true
    }
    return
  }
}
