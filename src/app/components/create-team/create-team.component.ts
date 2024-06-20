import { Component } from '@angular/core';
import axios from 'axios';
import { DataService } from '../../data.service';
import { CommonModule } from '@angular/common';
import { NoRightsComponent } from '../../erorr-components/no-rights/no-rights.component';
import { ModalNotificationComponent } from '../../modal/modal-notification/modal-notification.component';
import { modalEnterAnimation, modalleaveAnimation } from '../../animations/allAnimation';
import { FormsModule } from '@angular/forms';
import { teamForm } from '../../interfaces/forms';
import { postData } from '../../utils/allUtils';

@Component({
  selector: 'app-create-team',
  standalone: true,
  imports: [CommonModule, NoRightsComponent, ModalNotificationComponent, FormsModule],
  templateUrl: './create-team.component.html',
  styleUrl: './create-team.component.css',
  animations: [modalEnterAnimation, modalleaveAnimation]
})
export class CreateTeamComponent {
  tokens = this.dataService.getUserTokens()
  isLogin: boolean = false
  isNotification: boolean = false
  notification: any
  isTips: boolean = false
  isMembers: boolean = false
  memberTipsString: string = ''
  memberTips: any[] = []
  members: any[] = []
  imgLink: any
  creater:any


  teamForm: teamForm = {
    name: '',
    description: '',
    members: this.members,
    socialLinks: {
      tg: '',
      vk: '',
      inst: ''
    },
    nick: '',
    files: []
  }


  constructor(private dataService: DataService,) {
    dataService.dataChanged.subscribe(data => {
      if (data.status == 200) {
        this.isLogin = true;

        this.creater = {
          id: data.data.id,
          nick: data.data.nick,
          avatar: dataService.backHost + data.data.avatar,
          creator: true,
        }

        
        this.isMembers = true
      }
    })
  }


  getTips() {
    if (this.memberTipsString.length >= 3) {
      postData(this.tokens, 'auth/tips', {tips: this.memberTipsString}).then(data => {
        console.log(data);
        if (data.data.length < 1) {

        } else {
          for (let i = 0; i < data.data.length; i++) {
            data.data[i].avatar = this.dataService.backHost + data.data[i].avatar

          }
          this.memberTips = data.data;
          this.isTips = true
          console.log(this.memberTips);
        }


      })

    } else {
      this.isTips = false
    }
  }
  selectTip(id: any) {

    let newArr = this.memberTips.filter(obj => obj.id === id)
    for (let i = 0; i < newArr.length; i++) {
      newArr[i].type = 'Участник'
      this.members.push(newArr[i])

    }
    if (this.members) {
      console.log(this.members);

      this.isMembers = true;
    } else {
      this.isMembers = false
    }
  }

  onFilesSelected(event: any) {
    const files: FileList = event.target.files;
    if (files) {
      const selectedFiles: File[] = [];
      for (let i = 0; i < files.length; i++) {
        const file: File = files[i];

        if (file) {
          selectedFiles.push(file);
          const reader = new FileReader();
          reader.onload = (e: any) => {
            this.imgLink = e.target.result;

          };
          reader.readAsDataURL(file);



        }
      }
      this.teamForm.files = selectedFiles
    }

  }

  sendTeamData() {
    console.log(this.teamForm);
    const formData = new FormData();

    Object.keys(this.teamForm).forEach(key => {
      if (key === 'files') {
        const files: File[] = this.teamForm.files
        if (files) {
          for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i]);
          }
        }
      } else if (key === 'socialLinks') {
        formData.append('socialLinks', JSON.stringify(this.teamForm.socialLinks));
      } else if(key === 'members'){
        formData.append('members', JSON.stringify(this.teamForm.members));
      }
        else {
        formData.append(key, this.teamForm[key]);
      }
    });


  

    postData(this.tokens, 'auth/createTeam',formData).then(data => {
      console.log(data);

      if (data.status == 200) {

        this.isNotification = true;
        this.notification = { message: data.message, style: '0 0 10px green' }
        setTimeout(() => {
          this.isNotification = false
        }, 3000);
      } else {
        this.isNotification = true;
        this.notification = { message: data.message, style: '0 0 10px red' }
        setTimeout(() => {
          this.isNotification = false
        }, 3000);
      }
    })

  }

}
