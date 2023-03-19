import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, catchError, tap, throwError } from "rxjs";
import { User } from "./user.model";
import { environment } from "src/environments/environment";

export interface AuthResponseData
{
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string
    registered?: boolean
}

@Injectable({providedIn: 'root'})
export class AuthService
{

    constructor(private http: HttpClient, private router: Router) {}
    user = new BehaviorSubject<User>(null)
    

    signUp(email: string, password: string)
    {
       return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,

        {
            email: email,
            password: password,
            returnSecureToken: true
        }
        
        ).pipe(catchError(errorRes => {
          let errorMessage = 'An unknown error has occured!'

          if(!errorRes.error || !errorRes.error.error)
          {
            return throwError(errorMessage)
          }
          
          switch(errorRes.error.error.message)
        {
          case 'EMAIL_EXISTS':
              errorMessage = 'This Email is already in use!'       
              break;
        }
        return throwError(errorMessage)
      }))
    }

    login(email: string, password: string)
    {
     return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey,
      
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
      
      ).pipe(catchError(errorRes => {
        let errorMessage = 'An unknown error has occured!'

        if(!errorRes.error || !errorRes.error.error)
        {
          return throwError(errorMessage)
        }
        
        switch(errorRes.error.error.message)
      {
        case 'EMAIL_NOT_FOUND':
            errorMessage = 'This Email does not exist!'       
            break;
            case 'INVALID_PASSWORD':
              errorMessage = 'The entered password is invalid!'
              break;
              case 'USER_DISABLED':
                errorMessage = 'The account has been disabled by an administrator!'
                break;
      }
      return throwError(errorMessage)
    }), tap(resData => {
      this.handleAuth(
        resData.email,
        resData.localId,
        resData.idToken,
        resData.expiresIn)
    })
    )
    

    
    }
    private handleAuth(email:string, userId: string, token:string, expiresIn:string)
    {
      const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000)
        const user = new User(email, userId, token, expirationDate)
        this.user.next(user)
        localStorage.setItem('userData', JSON.stringify(user));
    }

    Logout()
     {
      this.user.next(null);
      this.router.navigate(['/auth']);
      localStorage.removeItem('userData')
     }

     autoLogin()
     {
        const userData: {
          email: string,
          id: string,
          _token: string,
          _tokenExpirationDate: string

        } = JSON.parse(localStorage.getItem('userData'))
        if(!userData)
        {
          return;
        }
        const loadedUser = new User(
          userData.email,
          userData.id,userData._token,
          new Date(userData._tokenExpirationDate));

          if(loadedUser.token)
          {
            this.user.next(loadedUser)
          }
     }

    

}