import { HttpClient, HttpParams } from "@angular/common/http";

import { Injectable } from "@angular/core";
import { exhaustAll, exhaustMap, map, take, tap } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";


@Injectable({
    providedIn: 'root'
})
export class DataStorageService{

    constructor(
      private http: HttpClient, 
      private recipeService: RecipeService,
      private authService: AuthService
      ){
    }

    storeRecipes(){
        const recipes = this.recipeService.getRecipes();
        return this.http.put('https://recipebook-c7f83-default-rtdb.firebaseio.com/recipes.json', recipes)
        .subscribe(
            (response)=>{
                console.log(response);
                
            }
        );
    }
    
    fetchRecipes() {
        
            return this.http.get<Recipe[]>(
              'https://recipebook-c7f83-default-rtdb.firebaseio.com/recipes.json',
          ).pipe(
      
        map(recipes => {
          return recipes.map(recipe => {
          return { 
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : []
          };
        })
      }),
      tap(recipes=>{
          this.recipeService.setRecipes(recipes);

        })
        )
      }

//     fetchRecipes(){
//       return this.authService.user.pipe(take(1),exhaustMap(user=>{ //take(1)will only 1 observable
//         console.log("inside fetch recipe of data storage");
          
//         return this.http.
//           get<Recipe[]>('https://recipebook-c7f83-default-rtdb.firebaseio.com/recipes.json',
//           {
//               params:new HttpParams().set('auth',user.token)
//           });
//       }),
//       map(recipes=>{
//         console.log("inside map of data storage");
        
//           return recipes.map(recipe=>{
//               return {...recipe,ingrediens:recipe.ingredients?recipe.ingredients:[]};
//           });
//       }),
//       tap(recipes => {
//         console.log("inside tap of data storage");
        
//           this.recipeService.setRecipes(recipes);
//       })
//   );
// }
}


// 