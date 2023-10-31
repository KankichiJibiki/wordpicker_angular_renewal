import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiUrls } from 'src/app/constants/api-urls';
import { WordSet } from 'src/app/models/word-set';
import { CreateWordValidatoins } from 'src/app/validations/create-word-validatoin';
import { WordType } from 'src/app/models/word-type';
import { WordSearch } from 'src/app/models/word-search';

@Injectable({
  providedIn: 'root'
})
export class WordSetService {
  wordSetList: WordSet[] = [];
  public wordTypesListSubject: BehaviorSubject<WordType[] | undefined> = new BehaviorSubject<WordType[] | undefined>(undefined);
  public wordListSubject: BehaviorSubject<WordSet[] | undefined> = new BehaviorSubject<WordSet[] | undefined>(undefined);
  private wordSetModifiedSubject = new BehaviorSubject<void>(undefined);
  wordSetModified$ = this.wordSetModifiedSubject.asObservable();

  constructor(
    private http: HttpClient,
    private createWordValidations: CreateWordValidatoins
  ) {}

  public addWordForm(){
    return this.createWordValidations.createWordForm(new WordSet());
  }

  public insertWordFormToEdit(wordSet: WordSet){
    return this.createWordValidations.createWordForm(wordSet);
  }

  public getWordTypes(){
    if(this.wordTypesListSubject.value == undefined){
      this._getWordTypes().subscribe({
        next: (res: any) => {
          this.storageWordType(res.data);
        }
      });
    }
  }

  private _getWordTypes(): Observable<Response>{
    let apiUrl = `${environment.apiUrl}/${ApiUrls.WORDLIST_URL}/${ApiUrls.WORDLIST_ACTION_URL_GET_WORD_TYPES}`;
    return this.http.get<Response>(apiUrl);
  }

  public storageWordType(wordTypeList: WordType[]){
    this.wordTypesListSubject.next(wordTypeList);
  }

  public emitWordSetModified(){
    this.wordSetModifiedSubject.next(undefined);
  }

  public getWordList(searchParams: WordSearch): Observable<Response>{
    let apiUrl = `${environment.apiUrl}/${ApiUrls.WORDLIST_URL}/${ApiUrls.WORDLIST_ACTION_URL_GET_WORDS}`;
    return this.http.post<Response>(apiUrl, searchParams);
  }

  public createWordList(wordSetList: WordSet[]): Observable<Response>{
    let apiUrl = `${environment.apiUrl}/${ApiUrls.WORDLIST_URL}/${ApiUrls.WORDLIST_ACTION_URL_CREATE}`;
    return this.http.post<Response>(apiUrl, wordSetList);
  }

  public removeWordList(wordSet: WordSet): Observable<Response>{
    let apiUrl = `${environment.apiUrl}/${ApiUrls.WORDLIST_URL}/${ApiUrls.WORDLIST_ACTION_URL_REMOVE}`;
    return this.http.put<Response>(apiUrl, wordSet);
  }

  public modifyWordList(wordSet: WordSet): Observable<Response>{
    let apiUrl = `${environment.apiUrl}/${ApiUrls.WORDLIST_URL}/${ApiUrls.WORDLIST_ACTION_URL_MODIFY}`;
    return this.http.put<Response>(apiUrl, wordSet);
  }

  public getCountByType(username: string): Observable<Response>{
    let apiUrl = `${environment.apiUrl}/${ApiUrls.WORDLIST_URL}/${ApiUrls.WORDLIST_ACTION_URL_COUNT_WORD_BY_TYPE}`;
    const params = {username: username};

    return this.http.post<Response>(apiUrl, params);
  }
}
