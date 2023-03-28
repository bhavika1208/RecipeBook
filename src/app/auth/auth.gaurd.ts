import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { map, Observable, take, tap } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGaurd implements CanActivate{
    
    constructor(private autService: AuthService, private router: Router)
    {

    }

    canActivate(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot)
    : boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.autService.user.pipe(
            take(1), // TO add only the latest user and 
            map(user=>{
            const isAuth = !!user;
            if(isAuth) {
                return true;
            }
            return this.router.createUrlTree(['/auth']);
        })
        // , tap(isAuth =>{
        //     if(!isAuth){
        //         this.router.navigate(['/auth']);
        //     }
        // })
        )
    }

}