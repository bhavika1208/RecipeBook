import { Component, ElementRef, ViewChild } from '@angular/core';
import { Ingredients } from 'src/app/shared/ingredients.model';
import { ShoppingListComponent } from '../shopping-list.component';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {

  @ViewChild('nameInput', {static: false}) nameInputRef : ElementRef;
  @ViewChild('amountInput', {static: false}) amountInputRef : ElementRef;

  constructor(private slService: ShoppingListService){

  }

  onAddItem(){
    const ingName = this.nameInputRef.nativeElement.value;
    const ingAmount = this.amountInputRef.nativeElement.value;
    // console.log(this.nameInputRef.nativeElement);
    // console.log(this.amountInputRef.nativeElement);    
    const newIngredient = new Ingredients(ingName, ingAmount);
    this.slService.addIngredient(newIngredient);
  
  }

}
