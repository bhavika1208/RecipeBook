import { Component, OnInit } from '@angular/core';
import { Ingredients } from '../shared/ingredients.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})

export class ShoppingListComponent implements OnInit{

  ingredients: Ingredients[];

  constructor(private slService: ShoppingListService){

  }

  ngOnInit(){
    this.ingredients = this.slService.getIngredients();
    this.slService.ingredientsCHange.subscribe(
      (ingredients: Ingredients[])=>{
        this.ingredients = ingredients;
      }
      )
  }

}
