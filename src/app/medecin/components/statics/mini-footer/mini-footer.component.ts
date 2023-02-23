import { Component, EventEmitter, Input, Output } from '@angular/core';
import { WebcamImage } from 'ngx-webcam';

@Component({
  selector: 'app-mini-footer',
  templateUrl: './mini-footer.component.html',
  styleUrls: ['./mini-footer.component.scss']
})
export class MiniFooterComponent {

  @Output() images: EventEmitter<WebcamImage[]> = new EventEmitter<WebcamImage[]>();
  @Output() submit: EventEmitter<Event> = new EventEmitter<Event>();

  @Input() disabled: boolean = true;

  getImages(event: WebcamImage[]){
    this.images.emit(event);
  }

  onClick(event: Event): void{
    this.submit.emit(event);
  }
}
