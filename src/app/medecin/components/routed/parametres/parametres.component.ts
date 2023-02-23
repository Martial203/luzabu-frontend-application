import { Component } from '@angular/core';

@Component({
  selector: 'app-parametres',
  templateUrl: './parametres.component.html',
  styleUrls: ['./parametres.component.scss']
})
export class ParametresComponent {
// Template management variable
language: boolean = false;
theme: boolean = false;
font_size: boolean = false;

onClick(name: "language"|"theme"|"font"): void{
  switch (name) {
    case "language":
      this.language = !this.language;
      break;
    case "theme":
      this.theme = !this.theme;
      break;
    case "font":
      this.font_size = !this.font_size;
      break;
  
    default:
      break;
  }
}
}
