import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiUrls } from 'src/app/constants/api-urls';
import { SpeechAudioData } from 'src/app/views/components/record-speech/record-speech.component';
import { TextData } from 'src/app/views/pronounce/pronounce.component';

@Injectable({
  providedIn: 'root'
})
export class TextAndSpeechService {

  constructor(private http: HttpClient) { }

  public getSpeechFile(textData: TextData): Observable<Response>{
    let apiUrl = `${environment.apiUrl}/${ApiUrls.TEXT_AND_SPEECH_URL}/${ApiUrls.TEXT_AND_SPEECH_URL_GET_AUDIO}`;
    return this.http.post<Response>(apiUrl, textData);
  }

  public getTextBySpeech(speechAudioData: SpeechAudioData): Observable<Response>
  {
    console.log(speechAudioData);
    let apiUrl = `${environment.apiUrl}/${ApiUrls.TEXT_AND_SPEECH_URL}/${ApiUrls.TEXT_AND_SPEECH_URL_GET_TEXT_BY_SPEECH}`;
    const options = { headers: { 'Content-Type': 'multipart/form-data' } };

    return this.http.post<Response>(
      apiUrl, 
      speechAudioData,
      options
      );
  }
}
