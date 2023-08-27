import { DialogService } from 'src/app/services/dialog/dialog.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LocalstorageService } from 'src/app/services/localstorage/localstorage.service';
import { AppMessages } from 'src/app/constants/app-messages';
import { OverlayService } from 'src/app/services/overlay/overlay.service';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

  constructor(
    public authService: AuthService,
    private localStorageService: LocalstorageService,
    private router: Router,
    private dialogService: DialogService,
    private overlayService: OverlayService,
    private spinnerService: SpinnerService
  ){}

  public moveToMypage(){
    
  }

  public signOut(){
    this.spinnerService.start();
    this.overlayService.createOverlay();

    this.authService.signOut()
    .then((res) => {
      this.localStorageService.remove('idToken');
      this.dialogService.openYesOrNoDialog('You signed out', false);
      this.router.navigate(['/signin'])
    }).catch((err) => {
      console.log(err);
      this.dialogService.openErrDialog(AppMessages.SIGNOUT_ERROR);
    }).finally(() => {
      this.spinnerService.stop();
      this.overlayService.disposeOverlay();
    });
  }
}
