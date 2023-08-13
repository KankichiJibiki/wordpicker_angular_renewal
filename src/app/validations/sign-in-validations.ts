import { Injectable } from "@angular/core";
import { Signin } from "../models/signin";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Injectable({
    providedIn: 'root'
})
export class SignInValidations{
    loginForm: any;
    signUpList = new Signin();

    constructor(){
        this.loginForm = new FormGroup({
            username: new FormControl(this.signUpList.username, [
                Validators.required,
            ]),
            password: new FormControl(this.signUpList.password, [
                Validators.required,
                Validators.minLength(8),
            ])
        })
    };
}