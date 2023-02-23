import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-chips-input',
  templateUrl: './chips-input.component.html',
  styleUrls: ['./chips-input.component.scss']
})

export class ChipsInputComponent {
  //Declaration for template texts
  @Input() label !: string;
  @Input() placeholder!: string;
  @Input() width: number = 50;
  @Input() min_width: number = 250;
  @Input() height!: number;

  //Fonctionnal declarations
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  items: string[] = [];
  control: FormControl = new FormControl([''], [Validators.required]);
  @Output() value : EventEmitter<string[]> = new EventEmitter<string[]>();
  subscription!: Subscription;

  ngOnInit(): void{
    this.subscription = this.control.valueChanges.subscribe(val => this.value.emit(val));
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.items.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(fruit: string): void {
    const index = this.items.indexOf(fruit);

    if (index >= 0) {
      this.items.splice(index, 1);
    }
  }

  edit(fruit: string, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove fruit if it no longer has a name
    if (!value) {
      this.remove(fruit);
      return;
    }

    // Edit existing fruit
    const index = this.items.indexOf(fruit);
    if (index >= 0) {
      this.items[index] = value;
    }
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }
}
