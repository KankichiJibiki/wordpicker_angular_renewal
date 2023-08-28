import { Auth, Amplify } from 'aws-amplify';
import { UserList } from './../../models/user-list';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Signin } from 'src/app/models/signin';
import { AppConfigs } from 'src/app/constants/app-configs';
import { apiUrls } from 'src/app/constants/api-urls';
import { Signup } from 'src/app/models/signup';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loginData = new Signin();
  username: string | null = null;
  public authenticationSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private http : HttpClient,
    private router: Router
  ) {
    //Cognito
    //* see how to add global https://docs.amplify.aws/start/getting-started/setup/q/integration/angular/
    Amplify.configure({
      Auth: {
        userPoolId: AppConfigs.POOLID,
        userPoolWebClientId: AppConfigs.POOL_CLIENT_ID,
      }
    })

    this.username = localStorage.getItem(('username'));
  }

  // public isAuthenticated(): boolean {
  //   const token = localStorage.getItem('authToken');
  //   return token != null;
  // }

  // public registerUser(userList: UserList): Observable<Response>{
  //   return this.http.post<Response>(`${environment.apiUrl}/${apiUrls.AUTH_URL}/${apiUrls.AUTH_ACTION_URL_REGISTER}`, userList);
  // }

  // public loginUser(userList: UserList): Observable<Response>{
  //   return this.http.post<Response>(`${environment.apiUrl}/${apiUrls.AUTH_URL}/${apiUrls.AUTH_ACTION_URL_LOGIN}`, userList);
  // }

  // public logout(){
  //   localStorage.clear();
  //   this.router.navigate(['login']);
  // }

  // public getUser(userParams: UserList){
  //   return this.http.post<Response>(`${environment.apiUrl}/${apiUrls.AUTH_URL}/${apiUrls.AUTH_ACTION_URL_GET}`, userParams);
  // }

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
        gender: signupList.gender,
      }
    });
  }

  public confirmSignup(username: string, code: string): Promise<any>{
    return Auth.confirmSignUp(username, code);
  }

  public signin(signinList: Signin): Promise<any>{
    return Auth.signIn(signinList.username, signinList.password)
    .then((res) => {
      this.authenticationSubject.next(true);
      return res;
    });
  }

  public signOut(): Promise<any>{
    return Auth.signOut()
    .then((res) => {
      this.authenticationSubject.next(false);
    })
  }

  public isAuthenticated(): Promise<any>{
    if(this.authenticationSubject.value){
      console.log(this.authenticationSubject.value)
      return Promise.resolve(true);
    } else {
      return this.getUser()
      .then((user: any) => {
        if(user) {
          console.log(true)
          console.log(user)
          return true;
        }
        else {
          console.log(false)
          return false
        }
      }).catch(() => {
        console.log(false)
        return false;
      });
    }
  }

  public getUser(): Promise<any>{
    return Auth.currentUserInfo();
  }
}
