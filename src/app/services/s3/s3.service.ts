import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiUrls } from 'src/app/constants/api-urls';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class S3Service {

  constructor(
    private http: HttpClient,
  ) { }

  public uploadIconToS3(formData: FormData): Observable<Response> {
    let apiUrl = `${environment.apiUrl}/${ApiUrls.S3_URL}/${ApiUrls.S3_ACTION_URL_REGISTER}`;

    return this.http.post<Response>(apiUrl, formData);
  }
}
