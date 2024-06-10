import { Component } from '@angular/core';
import { DataService } from '../../data.service';
import { CommonModule } from '@angular/common';
import axios from 'axios';
import { ModalNotificationComponent } from '../../modal/modal-notification/modal-notification.component';
import { modalEnterAnimation, modalleaveAnimation } from '../../animations/allAnimation';
import { FormsModule } from '@angular/forms';
import { editUserForm } from '../../interfaces/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalNotificationComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  animations: [modalEnterAnimation, modalleaveAnimation]
})
export class ProfileComponent {
  isUserToken: boolean | string = false
  userData: any;
  isEdit: boolean = false
  alertMessage: any;
  isNotification: boolean = false
  imgLink: string = '';
  userNick: string = '';

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
  }




  constructor(private dataService: DataService) {


    dataService.dataChanged.subscribe(data => {
      if (data.status == 200) {
        this.userData = data.data;
        this.userNick = this.userData.nick
        console.log('profile data', this.userData);
        this.userForm.userNick = this.userData.nick;
        if (this.userData.avatar) {
          this.imgLink = dataService.backHost + this.userData.avatar
        }

      }
    })

    this.isUserToken = dataService.accessToken.length > 1 ? dataService.accessToken : false;



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
    let obj =  {
      userNick: this.userForm.userNick,
      editFirstName: this.userForm.editFirstName.length == 0? this.userData.firstName: this.userForm.editFirstName,
      editSecondName: this.userForm.editSecondName.length == 0? this.userData.secondName: this.userForm.editSecondName,
      editLastName: this.userForm.editLastName.length == 0? this.userData.lastName: this.userForm.editLastName,
      editPhone: this.userForm.editPhone.length == 0? this.userData.phone: this.userForm.editPhone,
      editEmail: this.userForm.editEmail.length == 0? this.userData.email: this.userForm.editEmail,
      socialLinks: {
        editLinkInst: this.userForm.socialLinks.inst.length === 0? this.userData.socialLinks.inst : this.userForm.socialLinks.inst,
        editLinkTg: this.userForm.socialLinks.tg.length === 0? this.userData.socialLinks.tg : this.userForm.socialLinks.tg,
        editLinkVk: this.userForm.socialLinks.vk.length === 0? this.userData.socialLinks.vk : this.userForm.socialLinks.vk,
      },
      editDescription: this.userForm.editDescription.length == 0? this.userData.description: this.userForm.editDescription,
      files: this.userForm.files,
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



    let sendData = async (data: any, token: any) => {
      try {
        const responce = await axios.post('http://localhost:3000/auth/updateUser', data, {
          headers: {
            "Content-Type": 'multipart/form-data',
            accessToken: `Bearer ${token}`
          }
        })
        return responce.data
      } catch (error) {
        console.log(error);

      }
    }


    sendData(formData, this.isUserToken).then(data => {
      console.log(data);
      if (data.status == 200) {
        this.isNotification = true
        this.alertMessage = [{ message: data.message, style: '0 0 10px green' }]
        this.isEdit = false;


        setTimeout(() => {
          this.isNotification = false;
          location.reload()
        }, 2000);
      } else {
        this.alertMessage = [{
          message: data.message,
          style: '0 0 10px red'
        }]
        setTimeout(() => {
          this.isNotification = false;
          this.isEdit = false
        }, 2000);
      }

    })


  }
}
