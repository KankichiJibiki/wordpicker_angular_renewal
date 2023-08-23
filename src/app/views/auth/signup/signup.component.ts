import { DialogResult } from './../../components/dialog/yes-or-no-dialog/yes-or-no-dialog.component';
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
import { lastValueFrom } from 'rxjs';
import { AppMessages } from 'src/app/constants/app-messages';
import { MatStepper } from '@angular/material/stepper';
import { S3Service } from 'src/app/services/s3/s3.service';
import { S3Image } from 'src/app/models/s3-image';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  @ViewChild('fileInput') fileInput: any;
  @ViewChild('stepper') myStepper: MatStepper | undefined;
  file: File | null = null;
  uploadedImage: any = null;

  signup_validation_v1: any;
  signup_validation_v2: any;
  signupList = new Signup();
  hidePassword = true;
  doneSignup: boolean = false;
  verification_code: string = "";
  uploadedResponse: Response | undefined;
  s3_params = new S3Image();

  constructor(
    private aService: AuthService,
    private overlayService: OverlayService,
    private spinnerService: SpinnerService,
    private router: Router,
    private dialogService: DialogService,
    private signupValidations1: SignupValidations1,
    private signupValidations2: SignupValidations2,
    private s3Service: S3Service,
  ){
    this.signup_validation_v1 = this.signupValidations1.signupFormV1;
    this.signup_validation_v2 = this.signupValidations2.signupFormV2;
  }

  public async signup(){
    const yesOrNodialogRef = this.dialogService.openYesOrNoDialog(AppMessages.SIGNUP_CONSENT_MSG, true);
    let res: DialogResult | undefined = await lastValueFrom(yesOrNodialogRef.afterClosed());

    if(!res) return;

    this._putRequirementsTogether();
    this.overlayService.createOverlay();
    this.spinnerService.start();
    this.aService.signUp(this.signupList)
    .then(async () => {
      if(this.file != null)
        this.uploadIconToS3(this.file);

      console.log("Signed up");
      this.doneSignup = true;
      this.goForwardStep();
      // this.router.navigate(['/']);
    }).catch(async (err: string) =>{
      console.log(err);
      const dialogRef = this.dialogService.openErrDialog(err);
      let res: DialogResult | undefined = await lastValueFrom(dialogRef.afterClosed());
    }).finally(() => {
      this.spinnerService.stop();
      this.overlayService.disposeOverlay();
    })
  }

  public goForwardStep(){
    this.myStepper?.next();
  }

  public goBack(){
    this.myStepper?.previous();
  }

  public onClickFileInputButton(): void{
    this.fileInput.nativeElement.click();
  }

  public onChangeFileInput(): void{
    const reader = new FileReader();
    //* Refer to this page as a sample - https://www.bezkoder.com/angular-14-image-upload-preview/
    const files: { [key: string]: File } = this.fileInput.nativeElement.files;
    this.file = files[0];
    this.signupList.picture = AppConfigs.S3_USER_ICON_KEY + "/" + this.signupList.username;

    //* extract data as URL - 
    //* refer to this page https://stackoverflow.com/questions/58746058/show-uploaded-image-immediately-after-upload-in-angular
    reader.readAsDataURL(this.file);
    reader.onload = () => {
      this.uploadedImage = reader.result;
    };
  }

  public uploadIconToS3(file: File){
    console.log(file);
    const formData = new FormData();
    formData.append('file', file, this.signupList.picture);

    this.s3Service.uploadIconToS3(formData).subscribe({
      next: async (res: Response) => {
        console.log(res);
        if(!res.status){
          const dialogRef = this.dialogService.openErrDialog(AppMessages.UPLOAD_ICON_FAILURE_SIGNUP);
          await lastValueFrom(dialogRef.afterClosed());
        }
      },
      error: async (error) =>{
        const dialogRef = this.dialogService.openErrDialog(error);
        await lastValueFrom(dialogRef.afterClosed());
      }
    })
  }

  private _putRequirementsTogether(){
    this.signupList.address = this.signupList.state + this.signupList.city + this.signupList.address1 + this.signupList.address2;
    this.signupList.completed_phone_number = this.signupList.country_code + this.signupList.phone_number;
  }
}
