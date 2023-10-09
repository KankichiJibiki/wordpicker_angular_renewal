import { Injectable } from "@angular/core";
import { WordSearch } from "../models/word-search";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Injectable({
    providedIn: 'root'
})
export class SearchWordValidations{
    public getSearchWordInputs(){
        const wordInputs = new WordSearch();
        return new FormGroup({
            word: new FormControl(wordInputs.word, [
                Validators.maxLength(255)
            ]),
            favorite_flg: new FormControl(wordInputs.favoriteFlg, [
                Validators.pattern('[01]')
            ]),
            meaning: new FormControl(wordInputs.meaning, [
                Validators.maxLength(255)
            ]),
            typeId: new FormControl(wordInputs.typeId, [
                Validators.pattern('[0-9]')
            ])
        })
    }
}