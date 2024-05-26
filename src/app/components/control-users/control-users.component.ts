import { Component } from '@angular/core';
import { DataService } from '../../data.service';
import axios from 'axios';
import { CommonModule } from '@angular/common';
import { NoRightsComponent } from '../../erorr-components/no-rights/no-rights.component';


@Component({
  selector: 'app-control-users',
  standalone: true,
  imports: [CommonModule, NoRightsComponent],
  templateUrl: './control-users.component.html',
  styleUrl: './control-users.component.css'
})
export class ControlUsersComponent {
  isAdmin: boolean = this.dataService.isAdmin;
  userData: any
  usersData: any;


  constructor(private dataService: DataService) {
    dataService.dataChanged.subscribe(data => {
      this.userData = data
      console.log('ControlUsersComponent', this.userData);
    })
  }


  ngOnInit() {



    const getData = async (data: any) => {
      try {
        const responce = await axios.post('http://localhost:3000/auth/users', data, {
          headers: {
            Authorization: `Bearer ${data}`
          }
        })
        return responce.data

      } catch (error) {
        console.log(error);

      }
    }
    getData(this.dataService.getUserToken()).then(
      data => {
        this.usersData = data.data;
        console.log('Users', this.usersData)
      }

    )



  }
}
