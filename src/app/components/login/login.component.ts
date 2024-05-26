import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import axios from 'axios';
import { enterAnimations, leaveAnimation, modalEnterAnimation, modalleaveAnimation } from '../../animations/allAnimation';
import { CookieService } from 'ngx-cookie-service';
import { ModalNotificationComponent } from '../../modal/modal-notification/modal-notification.component';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalNotificationComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  animations: [modalEnterAnimation, modalleaveAnimation, enterAnimations, leaveAnimation]
})
export class LoginComponent {
  isLogin: boolean = true;
  isCorrectLogin: boolean = false
  alertMessage:any = []
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


    const login = async (data: any) => {
      try {
        const responce = await axios.post('http://localhost:3000/auth/login', data, {
          headers: {
            "Content-Type": 'application/json'
          }
        })
        return responce.data

      } catch (error) {
        console.log(error);

      }
    }
    login(data).then(data => {
      console.log(data);

      if (data.status != 200) {
        this.isCorrectLogin = true
        let obj: any = {
          message:`Ошибка: ${data.message}`,
          style: '0 0 10px red'
        } 
        this.alertMessage.push(obj)
 
        setTimeout(() => {
          this.isCorrectLogin = false
        }, 3000);

      } else {
        this.isCorrectLogin = true
        
        let obj: any = {
          message: `${data.message}, сейчас вас перенаправят.`,
          style: '0 0 10px green'
        }
        this.alertMessage.push(obj)
        this.cookieService.set('userToken', data.token)
           
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

    const regData = async (data: any) => {
      try {
        let responce = await axios.post('http://localhost:3000/auth/register', data, {
          headers: {
            "Content-Type": 'application/json'
          }
        })
        return responce.data
      } catch (error) {
        console.log(error);
      }


    }
    regData(data).then(data => {
      console.log(data);
      
      if (data.status != 200) {
        this.isCorrectLogin = true
        let obj: any = {
          message:`Ошибка: ${data.message}`,
          style: '0 0 10px red'
        }
        this.alertMessage.push(obj)

        setTimeout(() => {
          this.isCorrectLogin = false
        }, 3000);

      } else {
        this.isCorrectLogin = true
        this.cookieService.set('userToken', data.token)
        let obj: any = {
          message: `${data.message}, сейчас вас перенаправят.`,
          style: '0 0 10px green'
        }
        this.alertMessage.push(obj)

         setTimeout(() => {
          location.href  = '/'
        }, 2000);
  
      }
    })
    console.log(data);

  }
}
