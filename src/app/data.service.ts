import { Injectable, EventEmitter } from '@angular/core';
import axios from 'axios';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  refreshToken: string = this.cookieService.get('refreshToken');
  accessToken: string = this.cookieService.get('accessToken');
  isAdmin: boolean = false;
  isLogin: boolean = false;
  backHost: string = 'http://localhost:3000/'
  isAccess: boolean = false
  private userData: any = 'По кд'
  dataChanged = new EventEmitter<any>()

  getData = async (data: any): Promise<any> => {
    try {
      const responce = await axios.post('http://localhost:3000/auth/getUser', data, {
        headers: {
          accessToken: `Bearer ${data.accessToken}`,
        }
      })
      console.log('Полученные данные из сервисы ', responce.data);
      return responce.data

    } catch (error: any) {
      console.log(error);

      if (error.response.status == 401) {
        const responce = await axios.post('http://localhost:3000/auth/getUser', data, {
          headers: {
            refreshToken: `Bearer ${data.refreshToken}`,
          }
        })

        return responce.data
      }
    }
  }

  constructor(private cookieService: CookieService) {
     
    this.getData({ accessToken: this.accessToken, refreshToken: this.refreshToken }).then(data => {
      if (data.status == 205){
        console.log(document.cookie);
        
        cookieService.delete('refreshToken')
        cookieService.delete('accessToken')

        cookieService.set('accessToken', data.tokens.accessToken)
        cookieService.set('refreshToken', data.tokens.refreshToken)
      
      }

      this.isAdmin = data.data.roles === "admin" ? true : false
      data.data.admin = true;
      
      this.isLogin = true
     

      this.dataChanged.emit(data)
    })

  }

  getIsLogin() {
    return this.isLogin
  }
  getUserTokens(){
    return {
      refreshToken:this.refreshToken,
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
