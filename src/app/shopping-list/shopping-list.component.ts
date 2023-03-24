import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredients } from '../shared/ingredients.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})

export class ShoppingListComponent implements OnInit, OnDestroy{

  ingredients: Ingredients[];
  private igChangedSub: Subscription;

  constructor(private slService: ShoppingListService){

  }


  ngOnInit(){
    this.ingredients = this.slService.getIngredients();
    this.igChangedSub = this.slService.ingredientsCHange.
      subscribe(
        (ingredients: Ingredients[])=>{
          this.ingredients = ingredients;
        }
      )
  }

  onEditItem(index: number){
    this.slService.statedEditing.next(index);
  }

  ngOnDestroy(): void {
    this.igChangedSub.unsubscribe();
  }

}
