import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiUrls } from 'src/app/constants/api-urls';
import { WordSet } from 'src/app/models/word-set';

@Injectable({
  providedIn: 'root'
})
export class WordSetService {

  constructor(private http: HttpClient) { }

  public getWordsList(): Observable<Response> {
    let apiUrl = `${environment.apiUrl}/${ApiUrls.WORD_URL}/${ApiUrls.WORD_ACTION_URL_GETALL}`;

    return this.http.get<Response>(apiUrl);
  }

  public createWord(newWord: WordSet): Observable<Response> {
    let apiUrl = `${environment.apiUrl}/${ApiUrls.WORD_URL}/${ApiUrls.WORD_ACTION_URL_CREATE}`;

    return this.http.post<Response>
    (apiUrl, newWord);
  }

  public updateWord(update: WordSet): Observable<Response> {
    let apiUrl = `${environment.apiUrl}/${ApiUrls.WORD_URL}/${ApiUrls.WORD_ACTION_URL_UPDATE}`;

    return this.http.put<Response>(apiUrl, update);
  }

  public deleteWordSet(wordSet: WordSet): Observable<Response> {
    let apiUrl = `${environment.apiUrl}/${ApiUrls.WORD_URL}/${ApiUrls.WORD_ACTION_URL_DELETE}`;

    return this.http.put<Response>(apiUrl,wordSet);
  }

  public getTypes(): Observable<Response>{
    let apiUrl = `${environment.apiUrl}/${ApiUrls.TYPE_URL}/${ApiUrls.TYPE_ACTION_URL_GET}`;

    return this.http.get<Response>(apiUrl);
  }

  public slotWord(userId: number): Observable<Response>{
    let apiUrl = `${environment.apiUrl}/${ApiUrls.WORD_URL}/${ApiUrls.WORD_ACTION_URL_SLOT}`;

    return this.http.get<Response>(apiUrl)
  }
}
