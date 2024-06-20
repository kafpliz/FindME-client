import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { profileEnterAnimation, profileLeaveAnimation } from './../../animations/allAnimation';

import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { DataService } from '../../data.service';
import { ProfileModalComponent } from '../../modal/profile-modal/profile-modal.component';
import { CookieService } from 'ngx-cookie-service';
import { UserData } from '../../interfaces/forms';

@Component({
  selector: 'app-main-header',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule, ProfileModalComponent],
  templateUrl: './main-header.component.html',
  styleUrl: './main-header.component.css',
  animations: [profileEnterAnimation, profileLeaveAnimation]
})
export class MainHeaderComponent {
  profileModal: boolean = false
  isUserToken: boolean | string = false
  isLogin: boolean = false
  isAdmin: boolean = true
 
  userData!: UserData;

  constructor(private dataService: DataService, private cookieService: CookieService) {
    dataService.dataChanged.subscribe((data: { status: number, data: UserData }) => {

      if (data.status == 200 && data != null) {
        this.isLogin = true;
        this.isUserToken = dataService.accessToken
     
        this.userData = data.data
        this.userData.avatar = this.userData.avatar ? dataService.backHost + this.userData.avatar : 'http://localhost:3000//user_img/default.jpg'
        console.log(this.userData);

        
      }
    })

  }
  checkprofile() {
    if (this.profileModal == true) {
      this.profileModal = false
    } else {
      this.profileModal = true
    }
    return
  }
  logOut() {
    console.log('Вы вышли');
    this.cookieService.delete('accessToken')
    location.reload()
  }
}
