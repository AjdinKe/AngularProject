import { EventEmitter } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService
{
 // ingredientsChanged = new EventEmitter<Ingredient[]>();
 startedEditing = new Subject<number>();
   private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10)
      ]

      getIngredient(index: number)
      {
        return this.ingredients[index];
      }

      getIngredients()
      {
        return this.ingredients;
      }

      onIngredientAdded(ingredient: Ingredient)
      {
        this.ingredients.push(ingredient);
        //this.ingredientsChanged.emit(this.ingredients.slice())
      }

      addIngredients(ingredient: Ingredient[])
      {
        this.ingredients.push(...ingredient);
      }

      updateIngredient(index: number, newIngredient: Ingredient)
      {
       this.ingredients[index] = newIngredient;
      }

      deleteIngredient(index: number)
      {
        this.ingredients.splice(index, 1);
      }
}