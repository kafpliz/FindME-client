import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { CommonModule } from '@angular/common';
import axios from 'axios';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  isUserToken: boolean | string = false
  data: any;
  constructor(private dataService: DataService) {
    this.isUserToken = dataService.getUserToken().length > 1 ? dataService.getUserToken() : false
  }

  ngOnInit(): void {
    const getProfileInfo = async (data: any) => {
      try {
        const responce = await axios.post('http://localhost:3000/auth/getUser', data, {
          headers: {
            authorization: `Bearer ${this.isUserToken}`
          }
        })
        return responce.data
      } catch (error) {
          console.log(error);
          
      }
    }
    if (this.isUserToken != false) {
      getProfileInfo(this.isUserToken).then(data=> console.log(data))
    }
  }
}
