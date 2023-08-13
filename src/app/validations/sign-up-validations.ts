import { Signup } from './../models/signup';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Injectable({
    providedIn: 'root'
})
export class SignupValidations{
    signupForm: any;
    signupList = new Signup();

    constructor(){
        this.signupForm = new FormGroup({
            username: new FormControl(this.signupList.username, [
                Validators.required,
            ]),
            password: new FormControl(this.signupList.password, [
                Validators.required,
                Validators.minLength(10),
            ]),
            email: new FormControl(this.signupList.email, [
                Validators.required,
                Validators.email,
            ]),
            gender: new FormControl(this.signupList.gender, [
                Validators.required,
            ]),
            birthdate: new FormControl(this.signupList.birthdate, [
                Validators.required,
            ]),
            country_code: new FormControl(this.signupList.country_code, [
                Validators.required,
            ]),
            phone_number: new FormControl(this.signupList.phone_number, [
                Validators.required,
                Validators.pattern('[- +()0-9]+')
            ]),
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