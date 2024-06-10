import { Component } from '@angular/core';
import { DataService } from '../../data.service';
import axios from 'axios';
import { CommonModule } from '@angular/common';
import { NoRightsComponent } from '../../erorr-components/no-rights/no-rights.component';
import { FormsModule } from '@angular/forms';


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
     
      const getData = async (data: any) => {
        try {
          const responce = await axios.post('http://localhost:3000/auth/users', data, {
            headers: {
              Authorization: `Bearer ${data}`
            }
          })
          return responce.data
  
        } catch (error) {
          console.log(error);
  
        }
      }
    
      if(this.isAdmin === true){
        getData(this.dataService.getUserTokens()).then(
          data => {
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
