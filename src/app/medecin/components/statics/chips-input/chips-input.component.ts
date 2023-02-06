import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, Input } from '@angular/core';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';

export interface Item {
  name: string;
}

@Component({
  selector: 'app-chips-input',
  templateUrl: './chips-input.component.html',
  styleUrls: ['./chips-input.component.scss']
})

export class ChipsInputComponent {
  //Declaration for template texts
  @Input() label !: string;
  @Input() placeholder!: string;

  //Fonctionnal declarations
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  items: Item[] = [{name: 'Lemon'}, {name: 'Lime'}, {name: 'Apple'}];

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.items.push({name: value});
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(fruit: Item): void {
    const index = this.items.indexOf(fruit);

    if (index >= 0) {
      this.items.splice(index, 1);
    }
  }

  edit(fruit: Item, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove fruit if it no longer has a name
    if (!value) {
      this.remove(fruit);
      return;
    }

    // Edit existing fruit
    const index = this.items.indexOf(fruit);
    if (index >= 0) {
      this.items[index].name = value;
    }
  }
}