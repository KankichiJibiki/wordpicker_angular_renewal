import { Signup } from '../../models/signup';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Injectable({
    providedIn: 'root'
})
export class SignupValidations2{
    signupFormV2: any;
    signupList = new Signup();

    constructor(){
        this.signupFormV2 = new FormGroup({
            state: new FormControl(this.signupList.state, [
                Validators.required,
            ]),
            city: new FormControl(this.signupList.city, [
                Validators.required,
            ]),
            address1: new FormControl(this.signupList.address1, [
                Validators.required,
            ]),
            address2: new FormControl(this.signupList.address2, [
                Validators.required,
            ]),
        })
    };
}