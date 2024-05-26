import { Injectable, EventEmitter } from '@angular/core';
import axios from 'axios';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  userToken: string = this.cookieService.get('userToken');
  isAdmin: boolean = false;
  isLogin:boolean = false
  private userData:any = 'По кд'
  dataChanged = new EventEmitter<any>()
 

  getData =async (data:any): Promise<any> => {
    try {
      const responce = await axios.post('http://localhost:3000/auth/getUser', data, {
        headers: {
          Authorization: `Bearer ${data}`,
        }
      })
      console.log('Полученные данные из сервисы ', responce.data);
      return responce.data  
      
    } catch (error) {
      console.log(error);
      
    }
  }


  constructor(private cookieService: CookieService) {

    this.getData(this.userToken).then(data=> {
     this.isAdmin = data.data.roles === "admin" ? true : false
    this.isLogin = true
     
      this.dataChanged.emit(data)
    })
   }

  getUserToken(): string {
    return this.userToken
  }

  setUserData(data:any){
    this.userData = data
    console.log('где юзаешься');
    
    
    if(data.roles == 'admin'){
      this.isAdmin = true
    }
     
      
  }
  getUserRole(){
    return this.isAdmin
  }
  getUserData(){
    return this.userData
  }

}
