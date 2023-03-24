
import { Ingredients } from "../shared/ingredients.model";
import { Subject } from "rxjs";

export class ShoppingListService{

    ingredientsCHange = new Subject<Ingredients[]>();
    statedEditing = new Subject<number>();

    private  ingredients: Ingredients[] = [
        new Ingredients('Apple', 5),
        new Ingredients('Mango',9),
      ]

      getIngredients(){
        return this.ingredients.slice();
      }

      getIngredient(index: number){
        return this.ingredients[index];
      }

      addIngredient(ingredinet: Ingredients){
        this.ingredients.push(ingredinet);
        this.ingredientsCHange.next(this.ingredients.slice());
      }

      addIngredients(ingredients: Ingredients[]){
        this.ingredients.push(...ingredients);
        this.ingredientsCHange.next(this.ingredients.slice());
      }

      updateIngredients(index: number, newIngredinet: Ingredients){
        this.ingredients[index] = newIngredinet;
        this.ingredientsCHange.next(this.ingredients.slice());
      }

      deleteIngredinet(index: number){
        this.ingredients.splice(index, 1);
        this.ingredientsCHange.next(this.ingredients.slice());
      }

}