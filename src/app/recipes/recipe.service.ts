import { EventEmitter, Injectable } from "@angular/core";
import { Ingredients } from "../shared/ingredients.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService{

    recipeSeleted = new EventEmitter<Recipe>();
    private recipes: Recipe[] = [
        new Recipe(
            'Butter Panner Masala', 
            'this is a simple test', 
            'https://theurbantandoor.com/wp-content/uploads/2019/09/paneer-butter-masala.jpg',
            [
                new Ingredients ('Paneer', 1),
                new Ingredients ('Vegetables', 1)
            ]            
            ),
        new Recipe(
            'Shahi Paneer', 
            'this is a simple test', 
            'https://theurbantandoor.com/wp-content/uploads/2019/09/paneer-butter-masala.jpg',
            [
                new Ingredients ('Paneer', 3),
                new Ingredients ('Vegetables', 9)
            ]            
        )
      ];

    constructor(private slService: ShoppingListService ){

    }
    getRecipes(){
        return this.recipes.slice();
    }

    addIngredientsToShoppingList(ingredients: Ingredients[]){
        this.slService.addIngredients(ingredients);
    }
}