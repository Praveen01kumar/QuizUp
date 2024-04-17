import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SetquizComponent } from './setquiz/setquiz.component';
import { AttemptallqaComponent } from './attemptallqa/attemptallqa.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './login/login.component';
import { NotAuthGuard } from './auth/notauth.guard';
import { IsAdminAuthGuard } from './auth/isadmin.guard';

const routes: Routes = [
  { path: '', canActivate: [AuthGuard], component: HomeComponent },
  { path: 'login', canActivate: [NotAuthGuard], component: LoginComponent },
  { path: 'create', canActivate: [AuthGuard, IsAdminAuthGuard], component: SetquizComponent },
  { path: 'attempt-quiz', canActivate: [AuthGuard], component: AttemptallqaComponent },
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
