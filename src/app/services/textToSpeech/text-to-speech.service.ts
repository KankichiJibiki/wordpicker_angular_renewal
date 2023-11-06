import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiUrls } from 'src/app/constants/api-urls';
import { TextData } from 'src/app/views/pronounce/pronounce.component';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TextToSpeechService {

  constructor(private http: HttpClient) { }

  public getSpeechFile(textData: TextData): Observable<Response>{
    let apiUrl = `${environment.apiUrl}/${ApiUrls.TEXT_TO_SPEECH_URL}/${ApiUrls.TEXT_TO_SPEECH_URL_GET_FILE}`;
    return this.http.post<Response>(apiUrl, textData)
  }
}
