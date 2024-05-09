import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { enterAnimations, leaveAnimation } from '../animations/allAnimation';
import { Human } from '../../../interfaces/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import axios from 'axios';

@Component({
  selector: 'app-create-questionnaires',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-questionnaires.component.html',
  styleUrl: './create-questionnaires.component.css',
  animations: [enterAnimations, leaveAnimation]
})
export class CreateQuestionnairesComponent {
  human: boolean | null = true
  imgArr: string[] = [];
  counter: number = 0;

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    if (this.human == true) {
      this.form = fb.group({
        human: true,
        firstName: '',
        lastName: '',
        secondName: '',
        peculiarity: '',
        description: '',
        files: [''],
        timeWTF: '',

      })
    } else {
      this.form = fb.group({
        human: false,
        nick: '',
        peculiarity: '',
        description: '',
        img: [''],
        date: '',

      })
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
            this.imgArr.push(e.target.result);
          };
          reader.readAsDataURL(file);
        }
      }
      this.form.get('files')?.setValue(selectedFiles)
    }

  }
  

  sendData() {

    const formData = new FormData();
    
    Object.keys(this.form.value).forEach(key => {
      if (key === 'files') {
        const files: File[] = this.form.get('files')?.value;
        if (files) {
          for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i]);
          }
        }
      } else {
        formData.append(key, this.form.get(key)?.value);
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



     createNewBlank(formData).then(data=> console.log(data)    )

  }
}