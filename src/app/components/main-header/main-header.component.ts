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
  imgLink: string = ''
  userData!: UserData;

  constructor(private dataService: DataService, private cookieService: CookieService) {
    dataService.dataChanged.subscribe((data: { status: number, data: UserData }) => {
      console.log(data, ' 1');

      this.userData = data.data
      if (data.status == 200 && data != null) {
        this.isLogin = true;
        this.isUserToken = dataService.accessToken

        
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
