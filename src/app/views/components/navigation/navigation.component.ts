import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { AppMessages } from 'src/app/constants/app-messages';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { OverlayService } from 'src/app/services/overlay/overlay.service';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent{
  @ViewChild('sidenav') sidenav: MatSidenav | undefined;

  username: string | null = "";
  isAuthenticated: boolean = false;

  constructor(
    public authService: AuthService,
    private router: Router,
    private dialogService: DialogService,
    private overlayService: OverlayService,
    private spinnerService: SpinnerService,
  ){}

  public closeSideNav(){
    this.sidenav?.close();
  }

  public signOut(){
    this.spinnerService.start();
    this.overlayService.createOverlay();

    this.authService.signOut()
    .then(async (res) => {
      const dialogRef = this.dialogService.openYesOrNoDialog(AppMessages.SIGN_OUT_MSG, false);
      await lastValueFrom(dialogRef.afterClosed());
      this.router.navigate(['/'])
    }).catch((err) => {
      console.log(err);
      this.dialogService.openErrDialog(AppMessages.SIGNOUT_ERROR);
    }).finally(() => {
      this.closeSideNav();
      this.spinnerService.stop();
      this.overlayService.disposeOverlay();
    });
  }
}
