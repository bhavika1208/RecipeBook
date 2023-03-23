import { EventEmitter } from "@angular/core";
import { Subject } from "rxjs";

import { Ingredients } from "../shared/ingredients.model";

export class ShoppingListService{

    ingredientsCHange = new Subject<Ingredients[]>();
    private  ingredients: Ingredients[] = [
        new Ingredients('Apple', 5),
        new Ingredients('Mango',9),
      ]

      getIngredients(){
        return this.ingredients.slice();
      }

      addIngredient(ingredinet: Ingredients){
        this.ingredients.push(ingredinet);
        this.ingredientsCHange.next(this.ingredients.slice());
      }

      addIngredients(ingredients: Ingredients[]){
        // for(let ingredient of ingredients){
        //     this.addIngredient(ingredient);
        // }
        this.ingredients.push(...ingredients);
        this.ingredientsCHange.next(this.ingredients.slice());
      }

}