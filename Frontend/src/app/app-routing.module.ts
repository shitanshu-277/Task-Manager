import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { TodoComponent } from './components/todo/todo.component';

const routes: Routes = [
  {
    path: 'login', 
    component: LoginComponent, 
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path:'',
    redirectTo:'login',
    pathMatch: 'full'
  },
  {
    path:'todo',
    component:TodoComponent
  },
  {
    path: '**',
    component: LoginComponent 
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
