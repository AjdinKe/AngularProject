import { formatCurrency } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { resetFakeAsyncZone } from '@angular/core/testing';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('f') slForm: NgForm
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;


  constructor(private shoppingListService: ShoppingListService) { }


  ngOnInit(): void {

    this.subscription =  this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
    })
  }

  onAddItem(form: NgForm)
  {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if(this.editMode)
    {
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient)
    }
    else{
      this.shoppingListService.onIngredientAdded(newIngredient);
    }

    this.editMode = false;
    form.reset();
    
  }


  onDelete()
  {
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.slForm.reset();
    this.editMode = false;
  }
 
}
