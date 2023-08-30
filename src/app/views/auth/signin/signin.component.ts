import { LocalstorageService } from './../../../services/localstorage/localstorage.service';
import { Signin } from './../../../models/signin';
import { DialogService } from './../../../services/dialog/dialog.service';
import { SpinnerService } from './../../../services/spinner/spinner.service';
import { AuthService } from './../../../services/auth/auth.service';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { SignInValidations } from 'src/app/validations/sign-in-validations';
import { OverlayService } from 'src/app/services/overlay/overlay.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  signInList = new Signin();
  isLoginPage = true;
  authForm: any;
  hidePassword = true;

  constructor(
    public aService: AuthService,
    private router: Router,
    private signinV:  SignInValidations,
    public spinnerService: SpinnerService,
    private overlayService: OverlayService,
    private dialogService: DialogService,
    private localstorageService: LocalstorageService,
  ){
    this.authForm = this.signinV.loginForm;
  }

  public signin(){
    this.overlayService.createOverlay();
    this.spinnerService.start();
    this.aService.signin(this.signInList)
    .then((res) => {
      console.log(res);
      let decoded = jwt_decode(res.signInUserSession.idToken.jwtToken);
      let username = res.username
      this.localstorageService.set(decoded, "idToken");
      this.localstorageService.set(username, "username")
      this.router.navigate(['/']);
    }).catch(async (err) => {
      console.log(err);
      const dialogRef = this.dialogService.openErrDialog(err);
      await lastValueFrom(dialogRef.afterClosed());
    }).finally(() => {
      this.overlayService.disposeOverlay();
      this.spinnerService.stop();
    })
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

