import { Component } from '@angular/core';
import axios from 'axios';
import { DataService } from '../../data.service';
import { Users } from '../../interfaces/forms';
import { CommonModule } from '@angular/common';
import { NoRightsComponent } from '../../erorr-components/no-rights/no-rights.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { postData } from '../../utils/allUtils';

@Component({
  selector: 'app-all-users',
  standalone: true,
  imports: [CommonModule, NoRightsComponent, NgxSkeletonLoaderModule],
  templateUrl: './all-users.component.html',
  styleUrl: './all-users.component.css'
})
export class AllUsersComponent {
  isLogin: boolean = false;
  tokens = this.dataService.getUserTokens()
  users: Users[] = []
  loading:boolean = true
  constructor(private dataService: DataService,) {
   
  }


  ngOnInit() {
    console.log(this.tokens);
    if (this.tokens.accessToken || this.tokens.refreshToken) {
     
    
      postData( this.tokens, 'auth/publicUsers', '').then(data => {
        console.log(data);
        this.isLogin = true
        for (let i = 0; i < data.data.length; i++) {
          if(data.data[i].avatar){
            data.data[i].avatar = this.dataService.backHost + data.data[i].avatar;
          } else {
            data.data[i].avatar = '/assets/img/default.jpg'
          }
          
          data.data[i].socialLinks = JSON.parse(data.data[i].socialLinks)
          this.users.push(data.data[i])
        }
        console.log(this.users);
        setTimeout(() => {
          this.loading = false
        }, 3000);
      })
      

    }


  }
}
