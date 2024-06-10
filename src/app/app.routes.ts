import { Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { QuestionnairesComponent } from './components/questionnaires/questionnaires.component';
import { CreateQuestionnairesComponent } from './components/create-questionnaires/create-questionnaires.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ControlUsersComponent } from './components/control-users/control-users.component';
import { NotFoundComponent } from './erorr-components/not-found/not-found.component';
import { TeamsComponent } from './components/teams/teams.component';
import { CreateTeamComponent } from './components/create-team/create-team.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AllUsersComponent } from './components/all-users/all-users.component';

export const routes: Routes = [
    {path: '', component: MainComponent},
    {path: 'questionnaires',component: QuestionnairesComponent },
    {path: 'create-questionnaires', component: CreateQuestionnairesComponent},
    {path: 'login', component: LoginComponent},
    {path: 'profile', component: ProfileComponent},
    {path: 'control', component: ControlUsersComponent},
    {path: 'teams', component: TeamsComponent},
    {path: 'create-team', component: CreateTeamComponent},
    {path: 'settings', component: SettingsComponent},
    {path: 'users', component: AllUsersComponent},


    {path: '**', component: NotFoundComponent}
];
