import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiUrls } from 'src/app/constants/api-urls';
import { WordSet } from 'src/app/models/word-set';
import { CreateWordValidatoins } from 'src/app/validations/create-word-validatoin';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class WordSetService {
  wordSetList: WordSet[] = [];
  constructor(
    private http: HttpClient,
    private createWordValidations: CreateWordValidatoins
  ) {}

  public addWordForm(){
    return this.createWordValidations.createWordForm();
  }

  public createWordList(wordSetList: FormGroup[]){
    let apiUrl = `${environment.apiUrl}/${ApiUrls.WORDLIST_URL}/${ApiUrls.WORDLIST_ACTION_URL_CREATE}`;
    return this.http.post<Response>(apiUrl, wordSetList);
  }

  // public getWordsList(): Observable<Response> {
  //   let apiUrl = `${environment.apiUrl}/${ApiUrls.WORDLIST_URL}/${ApiUrls.WORD_ACTION_URL_GETALL}`;

  //   return this.http.get<Response>(apiUrl);
  // }

  // public createWord(newWord: WordSet): Observable<Response> {
  //   let apiUrl = `${environment.apiUrl}/${ApiUrls.WORDLIST_URL}/${ApiUrls.WORD_ACTION_URL_CREATE}`;

  //   return this.http.post<Response>
  //   (apiUrl, newWord);
  // }
}
