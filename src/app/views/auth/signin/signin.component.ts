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
  hidePassword = true;

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

  public signin(){
    this.overlayService.createOverlay();
    this.spinnerService.start();
    this.aService.signin(this.signInList)
    .then((res) => {
      let username = res.username
      this.router.navigate(['/dashboard']);
    }).catch(async (err) => {
      console.log(err);
      const dialogRef = this.dialogService.openErrDialog(err);
      await lastValueFrom(dialogRef.afterClosed());
    }).finally(() => {
      this.overlayService.disposeOverlay();
      this.spinnerService.stop();
    })
  }
}

