import { Injectable } from "@angular/core";

import { Recipe } from "../recipes/recipe.model";

import { HttpClient, HttpParams } from "@angular/common/http";
import { RecipeService } from "../recipes/recipe.service";
import { AuthService } from "../auth/auth.service";
import { exhaustMap, map, take, tap } from "rxjs";

@Injectable({providedIn: 'root'})

export class DataStorageService
{
    constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) {}

    storeRecipes()
    {
        const recipes = this.recipeService.getRecipe()
        this.http.put('https://ng-course-project-recipe-5a42a-default-rtdb.firebaseio.com/recipes.json', recipes).subscribe( response => {
            console.log(response)
        })

    }

    fetchRecipes() {
      
          return this.http.get<Recipe[]>(
            'https://ng-course-project-recipe-5a42a-default-rtdb.firebaseio.com/recipes.json',
          ).pipe(
            map(recipes => {
              return recipes.map(recipe => {
                return {
                  ...recipe,
                  ingredients: recipe.ingredients ? recipe.ingredients : []
                };
              });
            }),
            tap(recipes => {
              this.recipeService.setRecipe(recipes);
            })
          )
  
        }
}
    
  
  