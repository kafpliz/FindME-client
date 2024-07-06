import { Component } from '@angular/core';
import { DataService } from '../../data.service';
import { CommonModule } from '@angular/common';
import { ModalNotificationComponent } from '../../modal/modal-notification/modal-notification.component';
import { modalEnterAnimation, modalleaveAnimation } from '../../animations/allAnimation';
import { FormsModule } from '@angular/forms';
import { TokensAuth, editUserForm } from '../../interfaces/forms';
import { postData } from '../../utils/allUtils';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NoRightsComponent } from '../../erorr-components/no-rights/no-rights.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalNotificationComponent, NgxSkeletonLoaderModule, NoRightsComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  animations: [modalEnterAnimation, modalleaveAnimation]
})
export class ProfileComponent {
  isLogin: boolean = false
  userData: any;
  isEdit: boolean = false
  alertMessage: any = {};
  isNotification: boolean = false
  userNick: string = '';
  imgLink: string = ''
  tokens: TokensAuth = this.dataService.getUserTokens()
  loading: boolean | null = true
  userForm: editUserForm = {
    userNick: '',
    editFirstName: '',
    editSecondName: '',
    editLastName: '',
    editPhone: '',
    editEmail: '',
    socialLinks: {
      inst: '',
      tg: '',
      vk: '',
    },
    editDescription: '',
    files: [],
    confirmPassword: '',
    newPassword: ''
  }




  constructor(private dataService: DataService) {

    if (dataService.accessToken || dataService.refreshToken) {
      this.isLogin = true
      postData({ accessToken: dataService.accessToken, refreshToken: dataService.refreshToken }, 'auth/getUser', '').then(data => {
        if (data.status == 200) {
          this.loading = false;
          this.userData = data.data
          if(this.userData.avatar == null){
            this.userData.avatar = dataService.defaultAvatar
          } else {
            this.userData.avatar = dataService.backHost +this.userData.avatar 
          }
        }

      })
    } else {
      this.loading = null
      this.isLogin = false
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
      this.userForm.files = selectedFiles
    }

  }


  changeMode() {
    if (this.isEdit == false) {
      this.isEdit = true
    } else {
      this.isEdit = false
    }
  }
  sendEditData() {
    let obj = {
      userNick: this.userForm.userNick,
      editFirstName: this.userForm.editFirstName.length == 0 ? this.userData.firstName : this.userForm.editFirstName,
      editSecondName: this.userForm.editSecondName.length == 0 ? this.userData.secondName : this.userForm.editSecondName,
      editLastName: this.userForm.editLastName.length == 0 ? this.userData.lastName : this.userForm.editLastName,
      editPhone: this.userForm.editPhone.length == 0 ? this.userData.phone : this.userForm.editPhone,
      editEmail: this.userForm.editEmail.length == 0 ? this.userData.email : this.userForm.editEmail,
      socialLinks: {
        editLinkInst: this.userForm.socialLinks.inst.length === 0 ? this.userData.socialLinks?.inst : this.userForm.socialLinks.inst,
        editLinkTg: this.userForm.socialLinks.tg.length === 0 ? this.userData.socialLinks?.tg : this.userForm.socialLinks.tg,
        editLinkVk: this.userForm.socialLinks.vk.length === 0 ? this.userData.socialLinks?.vk : this.userForm.socialLinks.vk,
      },
      editDescription: this.userForm.editDescription.length == 0 ? this.userData.description : this.userForm.editDescription,
      files: this.userForm.files,
      confirmPassword: this.userForm.confirmPassword,
      newPassword: this.userForm.newPassword
    }

    const formData = new FormData();



    Object.keys(obj).forEach(key => {
      if (key === 'files') {
        const files: File[] = this.userForm.files
        if (files) {
          for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i]);
          }
        }
      } else if (key === 'socialLinks') {
        formData.append('socialLinks', JSON.stringify(this.userForm.socialLinks));
      } else {
        formData.append(key, this.userForm[key]);
      }
    });



    postData(this.tokens, 'auth/updateUser', formData, 'multipart/form-data').then(data => {
      console.log(data);
      if (data.status == 200) {
        this.isNotification = true
        this.alertMessage = { message: data.message, style: '0 0 10px green' }
        this.isEdit = false;


        setTimeout(() => {
          this.isNotification = false;
          location.reload()
        }, 2000);
      } else {
        console.log(300);
        this.isNotification = true;

        this.alertMessage = {
          message: data.message,
          style: '0 0 10px red'
        }
        setTimeout(() => {
          this.isNotification = false;
          this.isEdit = false
        }, 2000);
      }

    })


  }
}
