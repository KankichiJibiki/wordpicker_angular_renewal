import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiUrls } from 'src/app/constants/api-urls';
import { AppConfigs } from 'src/app/constants/app-configs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatgptService {

  constructor(private http: HttpClient) {}

  public getMeaning(word: string){
    let question = `What is meaning of ${word}? ` + AppConfigs.CHATGPT_DIRECT_JSON_FORMAT ;
    this.getAnswers(question).subscribe({
      next: (res: any) => {
        console.log(res);
        return res;
      }
    });
  }

  public getAnswers(question: string) {
    console.log(question);

    let apiUrl = `${environment.apiUrl}/${ApiUrls.OPENAI_URL}/${ApiUrls.OPENAI_ACTION_URL_GET_ANSWERS}`;
    return this.http.post<Response>(apiUrl, {question: question});
  }
}
