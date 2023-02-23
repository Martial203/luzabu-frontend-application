import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CameraComponent } from '../../camera/camera.component';
import { WebcamImage } from 'ngx-webcam';

@Component({
  selector: 'app-submit',
  templateUrl: './submit.component.html',
  styleUrls: ['./submit.component.scss']
})
export class SubmitComponent {

  @Output() images: EventEmitter<WebcamImage[]> = new EventEmitter<WebcamImage[]>();
  @Output() submit: EventEmitter<Event> = new EventEmitter<Event>();

  @Input() disabled: boolean = true;

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(CameraComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.images.emit(result);
    });
  }

  onClick(event: Event): void{
    this.submit.emit(event);
  }

}
