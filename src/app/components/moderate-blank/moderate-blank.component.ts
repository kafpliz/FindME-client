import { Component } from '@angular/core';
import { getData, postData } from '../../utils/allUtils';
import { DataService } from '../../data.service';
import { BlankForms, TokensAuth } from '../../interfaces/forms';
import { CommonModule } from '@angular/common';
import { NoRightsComponent } from '../../erorr-components/no-rights/no-rights.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-moderate-blank',
  standalone: true,
  imports: [CommonModule, NoRightsComponent, NgxSkeletonLoaderModule],
  templateUrl: './moderate-blank.component.html',
  styleUrl: './moderate-blank.component.css'
})
export class ModerateBlankComponent {
  tokens: TokensAuth = this.dataService.getUserTokens()
  isLogin: boolean = false
  isLoading: boolean = false
  moderateBlanks: BlankForms[] = []
  backHost: string = this.dataService.backHost

  constructor(private dataService: DataService) {
    postData(this.tokens, 'auth/moderateBlank',).then(data => {
      if (data.status == 200) {
        this.isLogin = true;

        for (const item of data.data) {
          const unixTimestamp = item.time; 
          const normalDate = new Date(unixTimestamp * 1000); 
          const formattedDate = `${normalDate.getFullYear()}-${String(normalDate.getMonth() + 1).padStart(2, '0')}-${String(normalDate.getDate()).padStart(2, '0')}`
          item.time = formattedDate
        }

        this.moderateBlanks = data.data
        console.log('moderateBlanks', this.moderateBlanks);

        setTimeout(() => {
          this.isLoading = false
        }, 2500);
      }


    })
  }

  approvedBlank(e:any){
   let blankID =e.target.id

   postData(this.tokens, 'auth/approvedBlank', {id: blankID}).then(data=> {
    console.log(data);
    
   })

  }

}
