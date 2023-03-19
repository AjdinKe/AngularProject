import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AlertComponent } from "./alert/alert.component";
import { DropdownToggle } from "./dropdown.directive";
import { Ingredient } from "./ingredient.model";
import { LoadingComponent } from "./loading.component";

@NgModule({
    declarations:[
        AlertComponent,
        LoadingComponent,
        DropdownToggle,
    ],
    imports:[
        CommonModule
    ],
    exports:[
        AlertComponent,
        LoadingComponent,
        DropdownToggle,
        CommonModule
    ]
})

export class SharedModule
{

}