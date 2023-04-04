import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AppService } from 'src/app/core/services/app.service';


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

languageCtrl: FormControl = new FormControl(null);
themeCtrl: FormControl = new FormControl(null);

constructor(private appService: AppService) {}

ngOnInit(): void{
  this.languageCtrl.valueChanges.subscribe(val => this.appService.switchLanguage(val));

  this.themeCtrl.valueChanges.subscribe(lightTheme => {
    this.appService.switchTheme(lightTheme);
  });
}

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
