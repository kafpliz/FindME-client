import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { QuestionnairesComponent } from './questionnaires/questionnaires.component';
import { CreateQuestionnairesComponent } from './create-questionnaires/create-questionnaires.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [
    {path: '', component: MainComponent},
    {path: 'questionnaires',component: QuestionnairesComponent },
    {path: 'create-questionnaires', component: CreateQuestionnairesComponent},
    {path: 'login', component: LoginComponent},
    {path: 'profile', component: ProfileComponent},
];
