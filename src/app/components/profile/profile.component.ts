import { Component } from '@angular/core';
import { DataService } from '../../data.service';
import { CommonModule } from '@angular/common';
import axios from 'axios';
import { FormsModule } from '@angular/forms';
import { ModalNotificationComponent } from '../../modal/modal-notification/modal-notification.component';
import { modalEnterAnimation, modalleaveAnimation } from '../../animations/allAnimation';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalNotificationComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  animations: [modalEnterAnimation, modalleaveAnimation]
})
export class ProfileComponent {
  isUserToken: boolean | string = false
  userData: any;
  isEdit: boolean = false
  alertMessage:any;
  isNotification:boolean = false

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
    this.isUserToken = dataService.userToken.length > 1 ? dataService.userToken : false;

    dataService.dataChanged.subscribe(data => {
      if (data.status == 200) {
        this.userData = data.data;
        this.userNick = this.userData.nick
        console.log('profile data', this.userData);
      }


    })
  }

  changeMode() {


    if (this.isEdit == false) {
      this.isEdit = true
    } else {
      this.isEdit = false
    }
  }
  sendEditData() {
    let objData = {
      nick: this.userNick,
      firstName: this.editFirstName.length > 1 ? this.editFirstName : this.userData.firstName,
      lastName: this.editLastName.length > 1 ? this.editLastName : this.userData.lastName,
      secondName: this.editSecondName.length > 1 ? this.editSecondName : this.userData.secondName,
      email: this.editEmail.length > 1 ? this.editEmail : this.userData.email,
      description: this.editDescription.length > 1 ? this.editDescription : this.userData.description,
      phone: this.editPhone.length > 1 ? this.editPhone : this.userData.phone,
      socialLinks: {
        tg: this.editLinkTg.length > 1 ? this.editLinkTg : this.userData.socialLinks.tg,
        inst: this.editLinkInst.length > 1 ? this.editLinkInst : this.userData.socialLinks.inst,
        vk: this.editLinkVk.length > 1 ? this.editLinkVk : this.userData.socialLinks.vk
      },
    }


    let sendData = async (data: any, token: any) => {
      try {
        const responce = await axios.post('http://localhost:3000/auth/updateUser', data, {
          headers: {
            "Content-Type": 'application/json',
            Authorization: `Bearer ${token}`
          }
        })
        return responce.data
      } catch (error) {
        console.log(error);

      }
    }
   
    
    sendData(objData, this.isUserToken).then(data => {
      console.log(data);
      if(data.status == 200){
        this.isNotification = true
        this.alertMessage = [{message: data.message,style: '0 0 10px green'}]
        this.isEdit = false;
        this.userData = objData;

        setTimeout(() => {
          this.isNotification = false;
          
        }, 2000);
      } else{
        this.alertMessage = [{
          message: data.message,
          style: '0 0 10px red'
        }]
        setTimeout(() => {
          this.isNotification = false;
          this.isEdit = false
        }, 2000);
      }
     
    })


  }
}
