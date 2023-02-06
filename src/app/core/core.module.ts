import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RessourceNotFoundComponent } from './components/ressource-not-found/ressource-not-found.component';


@NgModule({
  declarations: [
    RessourceNotFoundComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    RessourceNotFoundComponent
  ]
})
export class CoreModule { }
