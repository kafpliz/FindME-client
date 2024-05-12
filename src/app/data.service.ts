import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  userToken: string = this.cookieService.get('userToken');

  constructor(private cookieService: CookieService) { }

  getUserToken(): string {
    return this.userToken
  }
}
