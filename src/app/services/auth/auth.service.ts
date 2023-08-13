import { Auth, Amplify } from 'aws-amplify';
import { UserList } from './../../models/user-list';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Signin } from 'src/app/models/signin';
import { appConfigs } from 'src/app/constants/app-configs';
import { apiUrls } from 'src/app/constants/api-urls';
import { Signup } from 'src/app/models/signup';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loginData = new Signin();
  username: string | null = null;

  constructor(
    private http : HttpClient,
    private router: Router
  ) {
    //Cognito
    //* see how to add global https://docs.amplify.aws/start/getting-started/setup/q/integration/angular/
    Amplify.configure({
      Auth: {
        userPoolId: appConfigs.POOLID,
        userPoolWebClientId: appConfigs.POOL_CLIENT_ID,
      }
    })

    this.username = localStorage.getItem(('userName'));
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('authToken');
    return token != null;
  }

  public registerUser(userList: UserList): Observable<Response>{
    return this.http.post<Response>(`${environment.apiUrl}/${apiUrls.AUTH_URL}/${apiUrls.AUTH_ACTION_URL_REGISTER}`, userList);
  }

  public loginUser(userList: UserList): Observable<Response>{
    return this.http.post<Response>(`${environment.apiUrl}/${apiUrls.AUTH_URL}/${apiUrls.AUTH_ACTION_URL_LOGIN}`, userList);
  }

  public logout(){
    localStorage.clear();
    this.router.navigate(['login']);
  }

  public getUser(userParams: UserList){
    return this.http.post<Response>(`${environment.apiUrl}/${apiUrls.AUTH_URL}/${apiUrls.AUTH_ACTION_URL_GET}`, userParams);
  }

  public signUp(signupList: Signup): Promise<any>{
    //* see how to pass paramters -> https://docs.amplify.aws/lib/auth/emailpassword/q/platform/js/#sign-up
    return Auth.signUp({
      username: signupList.username,
      password: signupList.password,
      attributes: {
        email: signupList.email,
        picture: signupList.picture,
        address: signupList.address,
        birthdate: signupList.birthdate,
        phone_number: signupList.phone_number,
        gender: signupList.gender,
      }
    });
  }
}
