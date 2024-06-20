import { Component } from '@angular/core';
import { DataService } from '../../data.service';
import axios from 'axios';
import { CommonModule } from '@angular/common';
import { NoRightsComponent } from '../../erorr-components/no-rights/no-rights.component';
import { FormsModule } from '@angular/forms';
import { TokensAuth } from '../../interfaces/forms';
import { postData } from '../../utils/allUtils';


@Component({
  selector: 'app-control-users',
  standalone: true,
  imports: [CommonModule, NoRightsComponent,FormsModule],
  templateUrl: './control-users.component.html',
  styleUrl: './control-users.component.css'
})
export class ControlUsersComponent {
  isAdmin: boolean = this.dataService.isAdmin;
  userData: any
  usersData: any;
  isEdit:boolean = false;
  tokens:TokensAuth = this.dataService.getUserTokens()
  link:string = 'http://localhost:3000/'
  userNick: string = ''
  editFirstName: string = ''
  editSecondName: string = ''
  editLastName: string = ''
  editPhone: string = ''
  editEmail: string = ''
  editLinkInst: string = ''
  editLinkTg: string = ''
  editLinkVk: string = ''
  editDescription: string = ''



  constructor(private dataService: DataService) {
    dataService.dataChanged.subscribe(data => {
      this.userData = data
      if (this.userData.data.avatar) {
        this.link = dataService.backHost + this.userData.data.avatar
        console.log(this.link);
        
      }
      
      this.isAdmin = this.userData.data.admin
     
      
    
      if(this.isAdmin === true){
        postData(this.tokens, 'auth/users', '').then( data => {
            this.usersData = data.data;
            console.log('Users', this.usersData)
          }
    
        )
      }

    })
    
    

  }


  ngOnInit() {
  console.log(this.isAdmin, 'ngon init');
  
  }
  changeMode(){
    if(this.isEdit == true){
      this.isEdit = false
    }else{
      this.isEdit = true
    }
  }
}
