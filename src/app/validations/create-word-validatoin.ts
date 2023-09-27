import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import { WordSet } from '../models/word-set';

@Injectable({
    providedIn: 'root'
})
export class CreateWordValidatoins{
    public createWordForm(){
        const wordSet = new WordSet();
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
            favorite_flg: new FormControl(wordSet.favorite_flg, [
                Validators.pattern('[01]')
            ]),
            typeId: new FormControl(wordSet.typeId, [
                Validators.required,
                Validators.pattern('[0-9]')
            ])
        })
    }
}