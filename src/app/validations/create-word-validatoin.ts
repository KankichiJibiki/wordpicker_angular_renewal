import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import { WordSet } from '../models/word-set';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class CreateWordValidatoins{
    constructor(private authService: AuthService){}

    public createWordForm(){
        const wordSet = new WordSet();
        wordSet.username = this.authService.usernameSubject.value;
        
        return new FormGroup({
            word: new FormControl(wordSet.word, [
                Validators.required,
                Validators.maxLength(255)
            ]),
            meaning: new FormControl(wordSet.meaning, [
                Validators.required,
                Validators.maxLength(255)
            ]),
            useCase: new FormControl(wordSet.useCase, [
                Validators.maxLength(255)
            ]),
            synonymous: new FormControl(wordSet.synonymous, [
                Validators.maxLength(255)
            ]),
            favorite_flg: new FormControl(wordSet.favoriteFlg, [
                Validators.pattern('[01]')
            ]),
            typeId: new FormControl(wordSet.typeId, [
                Validators.required,
                Validators.pattern('[0-9]')
            ]),
            username: new FormControl(wordSet.username, [
                Validators.required
            ]),
        })
    }
}