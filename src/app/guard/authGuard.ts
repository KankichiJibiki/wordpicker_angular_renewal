import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth/auth.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate{
    constructor(
        private authService: AuthService,
        private router: Router,
    ){}

    public canActivate(
        next: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        let authenticated = false;
        return this.authService.isAuthenticated()
        .then((data: boolean | Promise<any>) => {
            if(!data){
                throw Error;
            }
            return true;
        }).catch(() => {
            console.log("Not Authorized");
            this.router.navigate(['/signin']);
            return false;
        })
    }
}