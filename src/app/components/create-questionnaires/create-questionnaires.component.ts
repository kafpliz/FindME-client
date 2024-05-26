import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { enterAnimations, leaveAnimation, modalEnterAnimation, modalleaveAnimation } from '../../animations/allAnimation';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import axios from 'axios';
import { ModalNotificationComponent } from '../../modal/modal-notification/modal-notification.component';

@Component({
  selector: 'app-create-questionnaires',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ModalNotificationComponent],
  templateUrl: './create-questionnaires.component.html',
  styleUrl: './create-questionnaires.component.css',
  animations: [enterAnimations, leaveAnimation, modalEnterAnimation, modalleaveAnimation]
})
export class CreateQuestionnairesComponent {
  human: boolean | null = null
  imgArr: string[] = [];
  counter: number = 0;
  correctSend: boolean = false;
  alertMessage: any = []

  formHuman: FormGroup;
  formAnimal: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formHuman = fb.group({
      human: true,
      firstName: '',
      lastName: '',
      secondName: '',
      peculiarity: '',
      description: '',
      files: [''],
      timeWTF: '',
    })
    this.formAnimal = fb.group({
      human: false,
      nick: '',
      peculiarity: '',
      description: '',
      files: [''],
      timeWTF: '',
    })


  }

  onFilesSelectedHuman(event: any) {
    const files: FileList = event.target.files;
    if (files) {
      const selectedFiles: File[] = [];
      for (let i = 0; i < files.length; i++) {
        const file: File = files[i];

        if (file) {
          selectedFiles.push(file);
          const reader = new FileReader();
          reader.onload = (e: any) => {
            this.imgArr.push(e.target.result);
          };
          reader.readAsDataURL(file);
        }
      }
      this.formHuman.get('files')?.setValue(selectedFiles)
    }

  }
  onFilesSelectedAnimal(event: any) {
    const files: FileList = event.target.files;
    if (files) {
      const selectedFiles: File[] = [];
      for (let i = 0; i < files.length; i++) {
        const file: File = files[i];

        if (file) {
          selectedFiles.push(file);
          const reader = new FileReader();
          reader.onload = (e: any) => {
            this.imgArr.push(e.target.result);
          };
          reader.readAsDataURL(file);
        }
      }
      this.formAnimal.get('files')?.setValue(selectedFiles)
    }

  }


  sendDataHuman() {

    const formData = new FormData();

    Object.keys(this.formHuman.value).forEach(key => {
      if (key === 'files') {
        const files: File[] = this.formHuman.get('files')?.value;
        if (files) {
          for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i]);
          }
        }
      } else {
        formData.append(key, this.formHuman.get(key)?.value);
      }
    });



    const createNewBlank = async (blank: any) => {
      try {
        console.log('blank:', blank);

        const responce = await axios.post('http://localhost:3000/form/create', blank, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        return responce.data
      } catch (error: any) {
        console.log('Общая ошибка:', error);
      }
    }



    createNewBlank(formData).then(data => {
      this.alertMessage = []
      if (data.status == 200) {
        let obj: any = {
          message: 'Анкета успешно отправлена на модерацию!',
          style: '0 0 10px green'
        }
        this.alertMessage.push(obj)
        this.correctSend = true;
      } else {
        let obj: any = {
          message: 'Ошибка при отправке анкеты',
          style: '0 0 10px red'
        }
        this.alertMessage.push(obj)

        this.correctSend = true;
      }



      setTimeout(() => {
        this.correctSend = false
      }, 3000);
    })

  }
  sendDataAnimal() {

    const formData = new FormData();

    Object.keys(this.formAnimal.value).forEach(key => {
      if (key === 'files') {
        const files: File[] = this.formAnimal.get('files')?.value;
        if (files) {
          for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i]);
          }
        }
      } else {
        formData.append(key, this.formAnimal.get(key)?.value);
      }
    });

    const createNewBlank = async (blank: any) => {
      try {
        console.log('blank:', blank);

        const responce = await axios.post('http://localhost:3000/form/create', blank, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        return responce.data
      } catch (error: any) {
        console.log('Общая ошибка:', error);
      }
    }



    createNewBlank(formData).then(data => console.log(data))




  }
}