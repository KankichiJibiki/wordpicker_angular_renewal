import { Auth, Amplify } from 'aws-amplify';
import { UserList } from './../../models/user-list';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Signin } from 'src/app/models/signin';
import { AppConfigs } from 'src/app/constants/app-configs';
import { Signup } from 'src/app/models/signup';
import { LocalstorageService } from '../localstorage/localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loginData = new Signin();
  public authenticationSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public usernameSubject: BehaviorSubject<string | undefined> = new BehaviorSubject<string | undefined>(undefined);

  constructor(
    private http : HttpClient,
    private router: Router,
    private localstorageService: LocalstorageService
  ) {
    //Cognito
    //* see how to add global https://docs.amplify.aws/start/getting-started/setup/q/integration/angular/
    Amplify.configure({
      Auth: {
        userPoolId: AppConfigs.POOLID,
        userPoolWebClientId: AppConfigs.POOL_CLIENT_ID,
      }
    })
    this.isAuthenticated();
  }

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
      this.usernameSubject?.next(signinList.username);
      this.localstorageService.set(signinList.username, "username")
      return res;
    });
  }

  public signOut(): Promise<any>{
    return Auth.signOut()
    .then((res) => {
      this.authenticationSubject.next(false);
      this.localstorageService.clearAll();
    })
  }

  public isAuthenticated(): Promise<any>{
    return Auth.currentAuthenticatedUser()
    .then((res) => {
      this.authenticationSubject.next(true);
      let username = this.localstorageService.get("username");
      if(username != null)
        this.usernameSubject.next(username);
      return true;
    })
    .catch((err) => {
      console.log(err);
      this.authenticationSubject.next(false);
      return false;
    })
  }

  public getUser(): Promise<any>{
    return Auth.currentUserInfo();
  }
}
