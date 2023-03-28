import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { User } from "./user.model";

export interface AuthResponseData{
    idToken : string,
    email : string,
    refreshToken : string,
    expiresIn : string,
    localId : string,
    registered? : boolean
}

@Injectable({
    providedIn:'root'
})
export class AuthService{
    user=new BehaviorSubject<User>(null);

    token:string=null;
    tokenExpirationTimer:any;
    constructor(private http:HttpClient,private router:Router){}

    signup(email:string,password:string){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDzLGQj2UYQCx66VgeEe3PkRfacUhrbRmA',
        {
            email:email,
            password:password,
            returnSecureToken:true
        }
        ).pipe(catchError(this.handleError),tap(resData=>{
            this.handleAuthentication(
                resData.email,
                resData.localId,
                resData.idToken,
                +resData.expiresIn)
        }));
    }

    login(email:string,password:string){
        return  this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDzLGQj2UYQCx66VgeEe3PkRfacUhrbRmA',
        {
            email:email,
            password:password,
            returnSecureToken:true
        }  ).pipe(catchError(this.handleError),tap(resData=>{
            this.handleAuthentication(
                resData.email,
                resData.localId,
                resData.idToken,
                +resData.expiresIn)
        }));
    }

    autoLogin(){
        const userData:{
            email:string,
            id:string,
            _token:string,
            _tokenExpirationDate:string
        }=JSON.parse(localStorage.getItem('userData'));
        if(!userData){
            return;
        }
        const loadedData=new User(userData.email,userData.id,userData._token,new Date(userData._tokenExpirationDate));
        if(loadedData.token){
            this.user.next(loadedData);
            const expirationDuration=new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
        }
    }

    logout(){
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if(this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer);
        }
    }

    autoLogout(expirationDuration){
        this.tokenExpirationTimer= setTimeout(()=>{
            this.logout();
        },expirationDuration);
    }
    
    
    private handleAuthentication(
        email:string,
        userId:string,
        token:string,
        expiresIn:number
        ){
            const exierationDate=new Date(new Date().getTime() + expiresIn*1000);
            const user= new User(email, userId, token, exierationDate);
            this.user.next(user);
            this.autoLogout(expiresIn*1000);
            localStorage.setItem('userData',JSON.stringify(user))
        }
    private handleError(errorRes:HttpErrorResponse){
        let errorMsg='An unknown error ocurred!!'
        if (!errorRes.error || !errorRes.error.error) {
            console.log('gg');
            return throwError(errorRes);
          }
        switch(errorRes.error.error.message){
            case 'EMAIL_EXISTS':
                errorMsg='email already exist!!';
                break;
            case 'INVALID_PASSWORD':
                errorMsg='email already exist!!';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMsg='email already exist!!';
                break;
        }
        return throwError(errorMsg);
    }
}




// import { HttpClient, HttpErrorResponse } from "@angular/common/http";
// import { Injectable } from "@angular/core";
// import { catchError, tap } from "rxjs/operators";
// import { BehaviorSubject, throwError } from "rxjs";
// import { User } from "./user.model";
// import { Route, Router } from "@angular/router";

// export interface AuthResponseData {
//     kind: string;
//     idToken: string;
//     email: string;
//     refreshToken: string;
//     expiresIn: string;
//     localId: string;
//     registered?: boolean;
// }


// @Injectable({ 
//     providedIn: 'root' 
// })
// export class AuthService{

//     user = new BehaviorSubject<User>(null);
//     token: string = null;
//     private tokenExpirationTime: any;
    
//     constructor(private http: HttpClient, private router: Router){
//     }


//     signup(email: string, password: string ){
//         return this.http.post<AuthResponseData>(
//             'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDzLGQj2UYQCx66VgeEe3PkRfacUhrbRmA',
//         {
//             email: email,
//             password: password,
//             returnSecuredToken: true

//         }).pipe(catchError(this.handlError), 
//             tap(resData => {
//             this.handleAuthentication(
//                 resData.email, 
//                 resData.localId, 
//                 resData.idToken, 
//                 +resData.expiresIn
//             )
//         }));
//     }

//     login(email: string, password: string){
//         return this.http.post<AuthResponseData>(
//             'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDzLGQj2UYQCx66VgeEe3PkRfacUhrbRmA',
//             {
//                 email: email,
//                 password: password,
//                 returnSecuredToken: true
//             }).pipe(catchError(this.handlError), tap(resData => {            
//                 this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
//             }));
//     }

//     autoLogin(){
//         const userData: {
//             email : string;
//             id: string;
//             _token : string;
//             _tokenExpirationDate : string;
//         } = JSON.parse(localStorage.getItem('userData'));
//         if(!userData){
//             return;
//         }

//         const loadedUser = new User(
//             userData.email, 
//             userData.id, 
//             userData._token,
//             new Date(userData._tokenExpirationDate)
//         );
    
//         if(loadedUser.token){
//             this.user.next(loadedUser);
//             const expirationDate = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
//             this.autoLogout(expirationDate);
//             console.log(expirationDate);
//         }
//     }

//     logout(){
//         this.user.next(null);
//         this.router.navigate(['./auth']);
//         localStorage.removeItem('userData');
//         if(this.tokenExpirationTime){
//             clearTimeout(this.tokenExpirationTime);
//         }
//         this.tokenExpirationTime = null;
//     }

//     autoLogout(expirationDuration: number){
//         console.log(expirationDuration);
      
//         setTimeout(()=>{   
//             this.logout();
//         }, 7000000);
//     }

//     private handleAuthentication(email: string,userId: string, token: string, expiresIn: number){
//         const expirationDate = new Date(new Date().getTime()+ (expiresIn*1000));
//         const user = new User(email, userId, token, expirationDate)
//         this.user.next(user);
//         this.autoLogout(expiresIn * 1000);
//         localStorage.setItem('userData', JSON.stringify(user))
    
//     }

//     private handlError(errorRes: HttpErrorResponse){
        
//         let errorMsg = "An Unknown error has been occured"
//         console.log(errorRes.error.error);
        
//         // errorRes.error && errorRes.error.error
//         if(!errorRes.error || !errorRes.error.error){
//             return throwError(errorMsg);
//         }
        
//         switch( errorRes.error.error.message){
//             case 'EMAIL_EXISTS': errorMsg = "An Email Exists Already";
//                                 break;
//             case 'EMAIL_NOT_FOUND': errorMsg = "This Email does not Exist";
//             break;
//             case 'INVALID_PASSWORD': errorMsg = "Password is Incorrect";
//             break;
        
//         }
//         return throwError(errorMsg);       
//     }
// }