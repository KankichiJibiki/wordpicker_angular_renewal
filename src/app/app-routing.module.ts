import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './views/auth/signup/signup.component';
import { IndexComponent } from './views/index/index.component';
import { AuthGuard } from './guard/authGuard';
import { SigninComponent } from './views/auth/signin/signin.component';

const routes: Routes = [
  // {path:'', component: IndexComponent, canActivate: [AuthGuard]},
  {path:'', component: SignupComponent},
  {path:'signin', component: SigninComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
