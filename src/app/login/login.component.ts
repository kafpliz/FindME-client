import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import axios from 'axios';
import { enterAnimations, leaveAnimation, modalEnterAnimation, modalleaveAnimation } from '../animations/allAnimation';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  animations: [modalEnterAnimation, modalleaveAnimation, enterAnimations, leaveAnimation]
})
export class LoginComponent {
  isLogin: boolean = true;
  isCorrectLogin: boolean = false
  alertMessage: string = 'Успешный вход'
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
        this.alertMessage = `Ошибка: ${data.message}`
        this.boxShadow = '0 0 10px red'
        setTimeout(() => {
          this.isCorrectLogin = false
        }, 9000);

      } else {
        this.isCorrectLogin = true
        this.alertMessage = `${data.message}, сейчас вас перенаправят.`
        this.boxShadow = '0 0 10px green'
        this.cookieService.set('userToken', data.token)
           
        setTimeout(() => {
          this.isCorrectLogin = false
        }, 9000);
        setTimeout(() => {
          location.href = '/profile'
        }, 10000);
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
        this.alertMessage = `Ошибка: ${data.message}`
        this.boxShadow = '0 0 10px red'

        setTimeout(() => {
          this.isCorrectLogin = false
        }, 9000);

      } else {
        this.isCorrectLogin = true
        this.alertMessage = `${data.message}, войдите ещё раз.`
        this.cookieService.set('userToken', data.token)


        this.boxShadow = '0 0 10px green'
        setTimeout(() => {
          this.isCorrectLogin = false
        }, 9000);
        setTimeout(() => {
          this.isLogin = true
        }, 10000);
      }
    })
    console.log(data);

  }
}
