import { Component } from '@angular/core';

@Component({
  selector: 'app-font-size-selection',
  templateUrl: './font-size-selection.component.html',
  styleUrls: ['./font-size-selection.component.scss']
})
export class FontSizeSelectionComponent {

  formatLabel(value: number): string{
    switch (value){
      case 1:
        return "Petite"
      case 2:
        return "Moyenne"
      case 3:
        return "Grande"
      default:
        return "Moyenne"
    }
  }
}
