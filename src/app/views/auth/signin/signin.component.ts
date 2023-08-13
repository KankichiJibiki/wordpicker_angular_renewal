import { Signin } from './../../../models/signin';
import { DialogService } from './../../../services/dialog/dialog.service';
import { SpinnerService } from './../../../services/spinner/spinner.service';
import { AuthService } from './../../../services/auth/auth.service';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { SignInValidations } from 'src/app/validations/sign-in-validations';
import { OverlayService } from 'src/app/services/overlay/overlay.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  signInList = new Signin();
  isLoginPage = true;
  authForm: any;

  constructor(
    public aService: AuthService,
    private router: Router,
    private signinV:  SignInValidations,
    public spinnerService: SpinnerService,
    private overlayService: OverlayService,
    private dialogService: DialogService,
  ){
    this.authForm = this.signinV.loginForm;
  }

  public login(){
    
  }

  // public login(){
  //   this.overlayService.createOverlay();
  //   this.spinnerService.start();

  //   this.aService.loginUser(this.userList)
  //   .subscribe({
  //     next: (res: Response | any) => {
  //       console.log(res);
  //       this.spinnerService.start();
  //       localStorage.clear();
  //       localStorage.setItem('authToken', res.data.token);
  //       localStorage.setItem('userId', res.data.id.toString());
  //       localStorage.setItem('userName', res.data.username.toString());
  //       this.router.navigate(['mainpage']);
  //     },
  //     error: (err: any) => {

  //     },
  //     complete: () => {
  //       this.aService.username = localStorage.getItem(('userName'));
  //       this.spinnerService.stop();
  //       this.overlayService.disposeOverlay();
  //     }
  //   })
  // }
}
