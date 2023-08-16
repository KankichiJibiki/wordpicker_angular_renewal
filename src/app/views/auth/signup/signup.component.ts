import { SignupValidations2 } from 'src/app/validations/signup/sign-up-validations2';
import { SignupValidations1 } from './../../../validations/signup/sign-up-validations1';
import { Signup } from './../../../models/signup';
import { SpinnerService } from './../../../services/spinner/spinner.service';
import { AuthService } from './../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { Component, ViewChild  } from '@angular/core';
import { OverlayService } from 'src/app/services/overlay/overlay.service';
import { AppConfigs } from 'src/app/constants/app-configs';
import { DialogService } from 'src/app/services/dialog/dialog.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  @ViewChild('fileInput')
  fileInput: any;
  file: File | null = null;
  uploadedImage: any = null;

  signup_validation_v1: any;
  signup_validation_v2: any;
  signupList = new Signup();
  hidePassword = true;

  constructor(
    private aService: AuthService,
    private overlayService: OverlayService,
    private spinnerService: SpinnerService,
    private router: Router,
    private dialogService: DialogService,
    private signupValidations1: SignupValidations1,
    private signupValidations2: SignupValidations2
  ){
    this.signup_validation_v1 = this.signupValidations1.signupFormV1;
    this.signup_validation_v2 = this.signupValidations2.signupFormV2;
  }

  public signup(){
    this._putRequirementsTogether();
    console.log(this.signupList);
    this.overlayService.createOverlay();
    this.spinnerService.start();

    this.aService.signUp(this.signupList)
    .then(() => {
      console.log("Signed up");
      this.router.navigate(['/']);
    }).catch((err: string) =>{
      console.log(err);
      this.dialogService.openErrDialog(err);
    }).finally(() => {
      this.spinnerService.stop();
      this.overlayService.disposeOverlay();
    })
  }

  public onClickFileInputButton(): void{
    this.fileInput.nativeElement.click();
  }

  public onChangeFileInput(): void{
    const reader = new FileReader();
    const formData: FormData = new FormData();

    //* Refer to this page as a sample - https://www.bezkoder.com/angular-14-image-upload-preview/
    const files: { [key: string]: File } = this.fileInput.nativeElement.files;
    this.file = files[0];
    formData.append('icon', this.file);
    this.signupList.picture = AppConfigs.S3_USER_ICON_KEY + "/" + this.signupList.username;

    //* extract data as URL - 
    //* refer to this page https://stackoverflow.com/questions/58746058/show-uploaded-image-immediately-after-upload-in-angular
    reader.readAsDataURL(this.file);
    reader.onload = () => {
      this.uploadedImage = reader.result;
    };
  }

  private _putRequirementsTogether(){
    this.signupList.address = this.signupList.state + this.signupList.city + this.signupList.address1 + this.signupList.address2;
    this.signupList.completed_phone_number = this.signupList.country_code + this.signupList.phone_number;
  }
}
