import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})

export class RecipeListComponent implements OnInit{
  
  recipes: Recipe[] = [
    new Recipe('A test recipe', 'this is a simple test', 'https://theurbantandoor.com/wp-content/uploads/2019/09/paneer-butter-masala.jpg'),
    new Recipe('A test recipe', 'this is a simple test', 'https://theurbantandoor.com/wp-content/uploads/2019/09/paneer-butter-masala.jpg')
  ];

  constructor(){  }
  
  ngOnInit() {
  }

}
