import { SignupValidations } from './../../../validations/sign-up-validations';
import { Signup } from './../../../models/signup';
import { SpinnerService } from './../../../services/spinner/spinner.service';
import { AuthService } from './../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { OverlayService } from 'src/app/services/overlay/overlay.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  authForm: any;
  signupList = new Signup();
  hidePassword = true;

  constructor(
    private aService: AuthService,
    private overlayService: OverlayService,
    private spinnerService: SpinnerService,
    private router: Router,
    private signupValidations: SignupValidations
  ){
    this.authForm = this.signupValidations.signupForm;
  }

  public signup(){
    this.overlayService.createOverlay();
    this.spinnerService.start();

    this.aService.signUp(this.signupList)
    .then(() => {
      console.log("Signed up");
      this.router.navigate(['/']);
    }).catch(() =>{

    }).finally(() => {
      this.spinnerService.stop();
      this.overlayService.disposeOverlay();
    })
  }
}
