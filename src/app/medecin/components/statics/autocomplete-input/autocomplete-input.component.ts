import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-autocomplete-input',
  templateUrl: './autocomplete-input.component.html',
  styleUrls: ['./autocomplete-input.component.scss']
})
export class AutocompleteInputComponent {
  //Declaration for template texts
  @Input() label!: string;
  @Input() placeholder!: string;
  @Input() width: number = 30;
  @Input() min_width: number = 0;
  //Functionnal declarations
  @Output() value: EventEmitter<string> = new EventEmitter<string>();
  myControl = new FormControl('', [Validators.required]);
  control$!: Subscription;
  @Input() optionsList: string[] = ['One', 'Two', 'Three'];
  filteredOptions!: Observable<string[]>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
    this.control$ = this.myControl.valueChanges.subscribe(val => {
      this.value.emit(val!)
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.optionsList.filter(option => option.toLowerCase().includes(filterValue));
  }

  ngOnDestroy(): void{
    this.control$.unsubscribe();
  }
}
