import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import { WordSet } from '../models/word-set';

@Injectable({
    providedIn: 'root'
})
export class CreateWordValidatoins{
    createWordForm: any;
    wordSet = new WordSet();

    constructor(){
        this.createWordForm = new FormGroup({
            word: new FormControl(this.wordSet.word, [
                Validators.required,
                Validators.maxLength(255)
            ]),
            meaning: new FormControl(this.wordSet.meaning, [
                Validators.required,
                Validators.maxLength(255)
            ]),
            useCase: new FormControl(this.wordSet.useCase, [
                Validators.maxLength(255)
            ]),
            favorite_flg: new FormControl(this.wordSet.favorite_flg, [
                Validators.pattern('[01]')
            ]),
            wordTypeId: new FormControl(this.wordSet.wordTypeID, [
                Validators.required,
                Validators.pattern('[0-9]')
            ])
        })
    };
}