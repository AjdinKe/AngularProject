import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()

export class RecipeService
{

  recipeSelected = new EventEmitter<Recipe>();
  recipesChanged = new Subject<Recipe[]>();

 /*   recipes: Recipe[] = [
        new Recipe('Hamburger', 'Greasy hamburger.',
         'https://img.freepik.com/premium-photo/cheese-burger-with-onion-tomato-lettuce-bacon-white-background_499484-1161.jpg?w=2000',
          [
            new Ingredient('Meat', 1),
            new Ingredient('Bun', 2)
          ]),
        new Recipe('Omelette', 'Tasty omelette!',
         'https://img.freepik.com/premium-photo/thai-omelette-white-plate-white-background_167862-1821.jpg?w=2000',
          [
            new Ingredient('Eggs', 2),
            new Ingredient('Butter', 1)
          ]),
      ];
 */
 
      recipes: Recipe[] = [];
      
      constructor(private slService: ShoppingListService) { }


      setRecipe(recipes: Recipe[])
      {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice())
      }

      getRecipe()
      {
        return this.recipes;
      }

      getRecipes(index: number)
      {
        return this.recipes.slice()[index];
      }

      addIng(ingredient: Ingredient[])
      {
        this.slService.addIngredients(ingredient);
      }

      addRecipe(recipe: Recipe)
      {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice())
      }

      updateRecipe(index: number, newRecipe: Recipe)
      {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice())
      }

      onDelete(index: number)
      {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice())
      }
    
}