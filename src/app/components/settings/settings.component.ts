import { Component } from '@angular/core';
import { DataService } from '../../data.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import axios from 'axios';
import { ModalNotificationComponent } from '../../modal/modal-notification/modal-notification.component';
import { modalEnterAnimation, modalleaveAnimation } from '../../animations/allAnimation';
import { NoRightsComponent } from '../../erorr-components/no-rights/no-rights.component';
import { postData } from '../../utils/allUtils';


@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalNotificationComponent, NoRightsComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
  animations: [modalEnterAnimation, modalleaveAnimation]
})

export class SettingsComponent {
  isLogin: boolean = false
  confirm: boolean | null = false
  sent: boolean = false
  code: string = ''
  tokens = this.dataService.getUserTokens()
  isNotification: boolean = false
  notification: any;
  publicProfile: boolean = true

  constructor(private dataService: DataService,) {
    dataService.dataChanged.subscribe(data => {
      console.log(data);

      if (data.status == 200) {
        this.isLogin = true
        this.confirm = data.data.confirmEmail
        this.publicProfile = data.data.public
      }

    })



  }

  sendEmailCode() {
    this.sent = true


    postData(this.tokens, 'auth/sendEmailCode').then(data => {
      console.log(data);

      if (data.status == 200) {
        this.notification = { message: data.message, style: '0 0 10px green' }
        this.isNotification = true;

        setTimeout(() => {
          this.isNotification = false
        }, 2000);
      }
    })

  }


  confirmEmailCode() {

    if (this.code.length == 6) {
      if (/^\d+$/.test(this.code)) {
        postData(this.tokens, 'auth/confirmEmail', { code: this.code }).then(data => {

          if (data.status == 200) {
            this.notification = { message: data.message, style: '0 0 10px green' }
            this.isNotification = true;

            setTimeout(() => {
              this.isNotification = false
            }, 2000);
          } else {
            this.notification = { message: data.message, style: '0 0 10px red' }
            this.isNotification = true;

            setTimeout(() => {
              this.isNotification = false
            }, 2000);
          }
        })

      } else {
        this.notification = { message: 'Введите цифровой код', style: '0 0 10px red' }
        this.isNotification = true;

        setTimeout(() => {
          this.isNotification = false
        }, 2000);
       
      }


    }
  }

  sendPublicProfile() {
    if (this.publicProfile == true) {
      postData(this.tokens, 'auth/setPublicProfile', { public: false } ).then(data => {
        if (data.status == 200) {
          this.notification = { message: data.message, style: '0 0 10px green' }
          this.isNotification = true;
          this.publicProfile = false
          setTimeout(() => {
            this.isNotification = false
          }, 2000);
        }
      })
    } else {
      postData(this.tokens, 'auth/setPublicProfile' ,{ public: true } ).then(data => {
       
        if (data.status == 200) {
          this.notification = { message: data.message, style: '0 0 10px green' }
          this.isNotification = true;
          this.publicProfile = true

          setTimeout(() => {
            this.isNotification = false
          }, 2000);
        }
      })

    }
  }

}
