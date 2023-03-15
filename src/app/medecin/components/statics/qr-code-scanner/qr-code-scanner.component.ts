import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ScannerQRCodeConfig, ScannerQRCodeSelectedFiles, NgxScannerQrcodeComponent, NgxScannerQrcodeService, ScannerQRCodeResult } from 'ngx-scanner-qrcode';

@Component({
  selector: 'app-qr-code-scanner',
  templateUrl: './qr-code-scanner.component.html',
  styleUrls: ['./qr-code-scanner.component.scss', '../../../../../assets/bootstrap.min.css']
})
export class QrCodeScannerComponent {

  config: ScannerQRCodeConfig = {
    // fps: 1000,
    vibrate: 400,
    // isBeep: true,
    // decode: 'macintosh',
    deviceActive: 1,
    constraints: {
      audio: false,
      video: {
        width: '100%'
      }
    }
  };

  @ViewChild('action') action!: NgxScannerQrcodeComponent;

  @Output() scan: EventEmitter<string> = new EventEmitter<string>();

  constructor(private qrcode: NgxScannerQrcodeService, private dialogRef: MatDialogRef<QrCodeScannerComponent>) { }

  ngAfterContentInit(): void {
    setTimeout(() => this.action.start(), 1000);
  }

  public onEvent(e: ScannerQRCodeResult[]): void {
    console.log(e);
    this.scan.emit(e[0].value);
    this.dialogRef.close(e[0].value);
    this.config.deviceActive = undefined;
  }

  public handle(action: any, fn: string): void {
    action[fn]().subscribe(console.log, alert);
  }
}
