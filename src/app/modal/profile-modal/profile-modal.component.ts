import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { DataService } from '../../data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-modal',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './profile-modal.component.html',
  styleUrl: './profile-modal.component.css',

})
export class ProfileModalComponent {
  @Input() data: any;
  isAdmin: boolean = this.dataService.isAdmin;
  isLogin: boolean = this.dataService.isLogin


  constructor(private dataService: DataService, private cookieService: CookieService,) {
    
    
  }

  logOut() {
    console.log('Вы вышли');
    this.cookieService.delete('accessToken')
    this.cookieService.delete('refreshToken')
    location.reload()
  }
}
