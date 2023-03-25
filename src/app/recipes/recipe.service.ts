import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredients } from "../shared/ingredients.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService{

    recipesChanged = new Subject<Recipe[]>();

    // private recipes: Recipe[] = [
    //     new Recipe(
            // 'Butter Panner Masala', 
            // 'this is a simple test', 
            // 'https://theurbantandoor.com/wp-content/uploads/2019/09/paneer-butter-masala.jpg',
            // [
            //     new Ingredients ('Paneer', 1),
            //     new Ingredients ('Vegetables', 1)
            // ]            
    //         ),
    //     new Recipe(
    //         'Shahi Paneer', 
    //         'this is a simple test', 
    //         'https://theurbantandoor.com/wp-content/uploads/2019/09/paneer-butter-masala.jpg',
    //         [
    //             new Ingredients ('Paneer', 3),
    //             new Ingredients ('Vegetables', 9)
    //         ]            
    //     )
    //   ];

     private recipes: Recipe[] = [];
   
    constructor(private slService: ShoppingListService ){

    }

    setRecipes(recipe: Recipe[]){
        this.recipes = recipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes(){
        return this.recipes.slice();
    }

    getRecipe(index: number){
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredients[]){
        this.slService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index:number, newRecipe: Recipe){
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index:number){
        this.recipes.splice(index,1);
        this.recipesChanged.next(this.recipes.slice());
    }
}