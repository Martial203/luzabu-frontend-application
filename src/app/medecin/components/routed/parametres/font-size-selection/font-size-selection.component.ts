import { Component } from '@angular/core';

@Component({
  selector: 'app-font-size-selection',
  templateUrl: './font-size-selection.component.html',
  styleUrls: ['./font-size-selection.component.scss']
})
export class FontSizeSelectionComponent {

  formatLabel(value: number): string{
    switch (value){
      case 0:
        return "Petite"
      case 1:
        return "Petite"
      case 2:
        return "Grande"
      default:
        return ""
    }
  }
}
