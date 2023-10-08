import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './views/auth/signup/signup.component';
import { IndexComponent } from './views/index/index.component';
import { AuthGuard } from './guard/authGuard';
import { SigninComponent } from './views/auth/signin/signin.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { DictionaryComponent } from './views/dictionary/dictionary.component';

const routes: Routes = [
  {path:'', component: SigninComponent},
  {path:'signup', component: SignupComponent},
  {path:'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path:'index', component: IndexComponent, canActivate: [AuthGuard]},
  {path:'dictionary', component: DictionaryComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
