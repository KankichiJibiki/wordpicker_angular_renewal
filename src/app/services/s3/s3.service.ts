import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrls } from 'src/app/constants/api-urls';
import { S3Image } from 'src/app/models/s3-image';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class S3Service {

  constructor(
    private http: HttpClient,
  ) { }

  public uploadIconToS3(s3Params: S3Image): Observable<Response> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    let apiUrl = `${environment.apiUrl}/${apiUrls.S3_URL}/${apiUrls.S3_ACTION_URL_REGISTER}`;

    return this.http.post<Response>(apiUrl, s3Params, {headers: headers});
  }
}
