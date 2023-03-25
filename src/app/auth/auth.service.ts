import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}


@Injectable({ 
    providedIn: 'root' 
})
export class AuthService{
    
    constructor(private http: HttpClient){

    }

    signup(email: string, password: string ){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBArJ_yqO0_p9KbaJ7fWfeLmwxE0VxXNVs',
        {
            email: email,
            password: password,
            returnSecuredToken: true

        }).pipe(catchError(errorRes=>{
            let errorMsg = "An Unknown error has been occured"
            if(!errorRes.error || !errorRes.error.error){
                return throwError(errorMsg);
            }
            
            switch( errorRes.error.error.message){
                case 'EMAIL_EXISTS': errorMsg = "An Email Exists Already"
            }
            return throwError(errorMsg);
        }));
    }

    login(email: string, password: string){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBArJ_yqO0_p9KbaJ7fWfeLmwxE0VxXNVs',{
            email: email,
            password: password,
            returnSecuredToken: true
        })
    }
}