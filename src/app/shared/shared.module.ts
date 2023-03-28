import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AppComponent } from "../app.component";
import { AlertComponent } from "./alert/alert.component";
import { DropdownDirective } from "./dropdown.directives";
import { PlaceHolderDirective } from "./placeholder/placeholder.directive";
import { LoadingSpinner } from "./spineer/loading-spinner.component";

@NgModule({
    declarations: [
        AlertComponent,
        PlaceHolderDirective,
        LoadingSpinner,
        DropdownDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        AlertComponent,
        PlaceHolderDirective,
        LoadingSpinner,
        DropdownDirective,
        CommonModule
    ],
    entryComponents: [AlertComponent]
})
export class SharedModule{

}