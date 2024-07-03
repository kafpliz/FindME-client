import { Injectable, EventEmitter } from '@angular/core';
import axios from 'axios';
import { CookieService } from 'ngx-cookie-service';
import { postData } from './utils/allUtils';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  refreshToken: string | boolean = this.cookieService.get('refreshToken') ? this.cookieService.get('refreshToken') : false;
  accessToken: string | boolean = this.cookieService.get('accessToken') ? this.cookieService.get('accessToken') : false;
  isAdmin: boolean = false;
  isLogin: boolean = false;
  backHost: string = 'http://localhost:3000/'
  isAccess: boolean = false
  private userData: any = 'По кд'
  dataChanged = new EventEmitter<any>()



  constructor(private cookieService: CookieService) {

    if (this.refreshToken || this.accessToken) {
      postData({ accessToken: this.accessToken, refreshToken: this.refreshToken }, 'auth/getUser', '').then(data => {
        console.log(data, '2');
        if (data.status == 200) {
          this.isLogin = true
          if(data.data.avatar){
            data.data.avatar = this.backHost + data.data.avatar
          } else {
            data.data.avatar = '/assets/img/default.jpg'
          }
          
          this.isAdmin = data.data.roles === "admin" ? true : false
          data.data.admin = true;
          this.isLogin = true
          this.dataChanged.emit(data)

        } else if (data.status == 205) {
          
          cookieService.delete('refreshToken')
          cookieService.delete('accessToken')
          cookieService.set('accessToken', data.tokens.accessToken)
          cookieService.set('refreshToken', data.tokens.refreshToken)
          this.accessToken = data.tokens.accessToken;
          this.refreshToken = data.tokens.refreshToken
          location.reload()

        }


      })
    }


  }

  getIsLogin() {
    return this.isLogin
  }
  getUserTokens() {
    return {
      refreshToken: this.refreshToken,
      accessToken: this.accessToken
    }
  }
  setUserData(data: any) {
    this.userData = data
    console.log('где юзаешься');


    if (data.roles == 'admin') {
      this.isAdmin = true
    }


  }
  getUserRole() {
    return this.isAdmin
  }
  getUserData() {
    return this.userData
  }

}
