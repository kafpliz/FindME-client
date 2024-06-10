import { Component } from '@angular/core';
import axios from 'axios';
import { DataService } from '../../data.service';
import { Users } from '../../interfaces/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-all-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './all-users.component.html',
  styleUrl: './all-users.component.css'
})
export class AllUsersComponent {
  isLogin: boolean = false;
  tokens = this.dataService.getUserTokens()
  users:Users[] = []
  constructor(private dataService: DataService,) {
    dataService.dataChanged.subscribe(data => {
     
      
      if (data.status == 200) {
        this.isLogin = true
   
      }
     
    })
   
    

  }


  ngOnInit(){
    let send = async (data: any) => {
      try {
        const responce = await axios.post('http://localhost:3000/auth/publicUsers', data.data, {
          headers: {
            accessToken: `Bearer ${data.tokens.accessToken}`,
          }
        })
       
        return responce.data
  
      } catch (error: any) {
      
      }
    }
    
    send({tokens: this.tokens, data: ''}).then(data=> {
      console.log(data);
      for (let i = 0; i < data.data.length; i++) {
        data.data[i].avatar = this.dataService.backHost  + data.data[i].avatar;
        data.data[i].socialLinks = JSON.parse(data.data[i].socialLinks)
        this.users.push(data.data[i])
      }
      console.log(this.users);
      
    })

  }
}
