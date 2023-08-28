import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import { WordSet } from '../models/word-set';

@Injectable({
    providedIn: 'root'
})
export class CreateValidatoins{
    createWordForm: any;
    wordSet = new WordSet();

    constructor(){
        this.createWordForm = new FormGroup({
            voca: new FormControl(this.wordSet.voca, [
                Validators.required,
            ]),
            definition: new FormControl(this.wordSet.definition, [
                Validators.required,
            ]),
            type: new FormControl(this.wordSet.typeId, [
                Validators.required,
            ])
        })
    };
}