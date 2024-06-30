import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import axios from 'axios';
import { enterAnimations, leaveAnimation, modalEnterAnimation, modalleaveAnimation } from '../../animations/allAnimation';
import { CookieService } from 'ngx-cookie-service';
import { ModalNotificationComponent } from '../../modal/modal-notification/modal-notification.component';
import { LoginForm } from '../../interfaces/forms';
import { postData } from '../../utils/allUtils';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalNotificationComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  animations: [modalEnterAnimation, modalleaveAnimation, enterAnimations, leaveAnimation]
})
export class LoginComponent {
  isLogin: LoginForm = {
    login: true,
    regestration: false,
    forgotPassword: false,
  };
  isCorrectLogin: boolean = false
  alertMessage: any = {}
  boxShadow: string = '0 0 10px green'
  nick: string = '';
  password: string = '';
  lastName: string = '';
  firsName: string = '';
  secondName: string = '';
  email: string = '';
  


  constructor(private cookieService: CookieService) {

  }

  sendLoginData() {
    let data = {
      nick: this.nick,
      password: this.password,
    }
    console.log(data);

    postData(null, 'auth/login', data).then(data => {
      console.log(data);

      if (data.status != 200) {
        this.isCorrectLogin = true
        let obj: any = {
          message: `Ошибка: ${data.message}`,
          style: '0 0 10px red'
        }
        this.alertMessage = obj

        setTimeout(() => {
          this.isCorrectLogin = false
        }, 3000);

      } else {
        this.isCorrectLogin = true

        let obj: any = {
          message: `${data.message}, сейчас вас перенаправят.`,
          style: '0 0 10px green'
        }
    
        this.alertMessage = obj
     

        this.cookieService.set('accessToken', data.tokens.accessToken)
        this.cookieService.set('refreshToken', data.tokens.refreshToken)

        setTimeout(() => {
          this.isCorrectLogin = false
        }, 3000);
        setTimeout(() => {
           location.href = '/'
        }, 3500);
      }
    });

  }

  sendRegData() {
    let data = {
      firstName: this.firsName,
      lastName: this.lastName,
      secondName: this.secondName,
      nick: this.nick,
      password: this.password,
      email: this.email,
    }
    postData(null, 'auth/register', data).then(data => {
      console.log(data);

      if (data.status != 200) {
        this.isCorrectLogin = true
        let obj: any = {
          message: `Ошибка: ${data.message}`,
          style: '0 0 10px red'
        }
        this.alertMessage = obj

        setTimeout(() => {
          this.isCorrectLogin = false
        }, 3000);

      } else {
        this.isCorrectLogin = true
        let obj: any = {
          message: `${data.message}, сейчас вас перенаправят.`,
          style: '0 0 10px green'
        }
        this.alertMessage = obj

        setTimeout(() => {
          this.isCorrectLogin = false
          location.href = '/'
        }, 2000);

      }
    })
    console.log(data);
  }
  editLoginMode() {

    if (this.isLogin.login == true) {
      this.isLogin.login = false

      setTimeout(() => {
        this.isLogin.regestration = true
      }, 500);
      this.isLogin.forgotPassword = false
    } else {
      this.isLogin.regestration = false

      setTimeout(() => {
        this.isLogin.login = true;
      }, 500);
      this.isLogin.forgotPassword = false
    }

  }
  editForgotMode() {
    if (this.isLogin.forgotPassword == false) {
      this.isLogin.login = false
      setTimeout(() => {
        this.isLogin.forgotPassword = true;
      }, 500);
    } else {
      this.isLogin.forgotPassword = false;
      this.isLogin.login = true
    }

  }
  forgotPassword() {
    let data = {
      email: this.email,
    }
    postData(null, 'auth/fogortPassword', data).then(data => {
     
      
      console.log(data);
      if (data.status == 200) {
        this.isCorrectLogin = true
        let obj: any = {
          message: ` Успешно: ${data.message}`,
          style: '0 0 10px green'
        }
        
        this.alertMessage = obj
        

        setTimeout(() => {
          this.isCorrectLogin = false

        }, 3000);
        setTimeout(() => {
          this.isLogin.forgotPassword = false
          this.isLogin.login = true
        }, 300);

      } else {
        this.isCorrectLogin = true
        let obj: any = {
          message: `Ошибка: ${data.message}`,
          style: '0 0 10px red'
        }
        this.alertMessage = obj
        setTimeout(() => {
          this.isCorrectLogin = false
        }, 3000);
      }


    })
  }
}
