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
        img: [''],
        date: '',

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
      const formFiles: File[] = []
      for (let i = 0; i < files.length; i++) {
        const file: File = files[i];
        formFiles.push(file)
        if (file) {

          const reader = new FileReader();
          reader.onload = (e: any) => {
            this.imgArr.push(e.target.result);
          };
          reader.readAsDataURL(file);
        }
      }
      this.form.patchValue({ img: formFiles })
    }

  }

  sendData() {
    let data: any = this.form.value

    console.log(data);
    const createNewBlank = async (blank:any) => {
      try {
        const responce = await axios.post('http://localhost:3000/form/create',blank);
         return responce.data
      } catch (error:any) {
          console.log('Общая ошибка:', error);      
      }
    }
    createNewBlank(data).then(data=> console.log(data)    )

  }
}