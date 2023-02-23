import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-landing-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})

export class AsideComponent {

  @Input() title!: string;

}
