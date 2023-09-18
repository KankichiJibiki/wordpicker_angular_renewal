import { LocalstorageService } from './../services/localstorage/localstorage.service';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable, lastValueFrom } from "rxjs";
import { AuthService } from "../services/auth/auth.service";
import { DialogService } from "../services/dialog/dialog.service";
import { AppMessages } from "../constants/app-messages";
import { DialogResult } from "../views/components/dialog/yes-or-no-dialog/yes-or-no-dialog.component";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate{
    constructor(
        private authService: AuthService,
        private router: Router,
        private dialogService: DialogService,
        private localstorageService: LocalstorageService
    ){}

    public canActivate(
        next: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.authService.isAuthenticated()
        .then((data: boolean | Promise<any>) => {
            if(!data){
                throw Error;
            }
            return true;
        }).catch(() => {
            this._notAuthorized();
            return false;
        })
    }

    private async _notAuthorized(): Promise<void>{
        const dialogRef = this.dialogService.openErrDialog(AppMessages.NOT_AUTHORIZED);
        await lastValueFrom(dialogRef.afterClosed());

        this.localstorageService.clearAll();
        this.router.navigate(['/']);
    }
}