import { Component } from '@angular/core';
import { DataService } from '../../data.service';
import axios from 'axios';
import { CommonModule, NgIf } from '@angular/common';
import { NoRightsComponent } from '../../erorr-components/no-rights/no-rights.component';
import { FormsModule } from '@angular/forms';
import { TokensAuth } from '../../interfaces/forms';
import { postData } from '../../utils/allUtils';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ModalNotificationComponent } from '../../modal/modal-notification/modal-notification.component';
import { modalEnterAnimation, modalleaveAnimation } from '../../animations/allAnimation';


@Component({
  selector: 'app-control-users',
  standalone: true,
  imports: [CommonModule, NoRightsComponent,FormsModule, NgxSkeletonLoaderModule, ModalNotificationComponent],
  templateUrl: './control-users.component.html',
  styleUrl: './control-users.component.css',
  animations: [modalEnterAnimation, modalleaveAnimation]
})
export class ControlUsersComponent {
  isAdmin: boolean | null= null;
  usersData: any;
  isEdit:boolean = false;
  tokens:TokensAuth = this.dataService.getUserTokens()
  backHost:string = this.dataService.backHost
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
  isLoading: boolean | null = true
  isNotification: boolean = false
  notificationMessage: any = {}

  constructor(private dataService: DataService) {
        postData(this.tokens, 'auth/users', '').then(data => {
          
          if(data.status == 200){
            this.usersData = data.data;
            console.log('Users', this.usersData)
            this.isLoading = false;
          } else if(data.status == 400){
            this.isLoading = null
            this.isAdmin = false;
            this.notificationMessage = {message: `${data.message}`,style: '0 0 10px red'}
            this.isNotification = true;

            setTimeout(() => {
              this.isNotification = false
            }, 2500);
          }

           
          }
    
        )
      
    
    

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
