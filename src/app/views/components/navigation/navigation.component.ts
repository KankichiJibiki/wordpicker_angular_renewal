import { DialogService } from 'src/app/services/dialog/dialog.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LocalstorageService } from 'src/app/services/localstorage/localstorage.service';
import { AppMessages } from 'src/app/constants/app-messages';
import { OverlayService } from 'src/app/services/overlay/overlay.service';
import { SpinnerService } from 'src/app/services/spinner/spinner.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit{
  username: string | null = "";
  authenticated: boolean = false;
  public authenticationSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    public authService: AuthService,
    private router: Router,
    private dialogService: DialogService,
    private overlayService: OverlayService,
    private spinnerService: SpinnerService,
    private localstorageService: LocalstorageService
  ){}

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.username = this.localstorageService.get("username");
    this.isAuthenticated();
  }

  public moveToMypage(){
    
  }

  public isAuthenticated(){
    this.authService.isAuthenticated()
    .then((data) => { 
      console.log(data)
      this.authenticationSubject.next(data); 
    }).catch(() => { 
      console.log(false)
      this.authenticationSubject.next(false); 
    });
  }

  public signOut(){
    this.spinnerService.start();
    this.overlayService.createOverlay();

    this.authService.signOut()
    .then((res) => {
      this.localstorageService.remove('idToken');
      this.dialogService.openYesOrNoDialog('You signed out', false);
      this.router.navigate(['/signin'])
    }).catch((err) => {
      console.log(err);
      this.dialogService.openErrDialog(AppMessages.SIGNOUT_ERROR);
    }).finally(() => {
      this.spinnerService.stop();
      this.overlayService.disposeOverlay();
      this.isAuthenticated();
    });
  }
}
