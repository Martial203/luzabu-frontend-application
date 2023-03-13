import { AfterViewInit, Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
declare let ml5: any;
@Component({
  selector: 'app-a-propos',
  templateUrl: './a-propos.component.html',
  styleUrls: ['./a-propos.component.scss']
})
export class AProposComponent implements OnInit, AfterViewInit{
  mobileNetFeatureExtractor!: any;
  featureClassifier!: any;
  label!: string;
  confidence!: any;
  newLabel!: string;
  currentProgress = 0;
  loss!: number;
  iteration!: number;
  @ViewChild('video')  public video!: ElementRef;
  @ViewChild('canvas')  public canvas!: ElementRef;
  captures!: Array<any>;
  constructor(private zone: NgZone) {
    this.captures = [];
  }
  ngOnInit(): void {
     this.mobileNetFeatureExtractor = ml5.featureExtractor('MobileNet', () => {
      this.featureClassifier = this.mobileNetFeatureExtractor.classification(this.video.nativeElement, () => {
        console.log('Vidéo ready');
      });
    });
  }
  addImage() {
    console.log(this.featureClassifier)
    this.featureClassifier.addImage(this.newLabel);
    this.capture();
  }
  train() {
    this.iteration = 0; this.loss = 0;
    this.currentProgress = 0;
    this.featureClassifier.train((loss: any) => {
      if (loss == null) {
        this.iteration = 100;
        this.mobileNetFeatureExtractor.classify((e: any, r: any) => {
          this.gotResults(e, r);
        });
      } else {
        this.zone.run(() => {
          ++this.currentProgress;
          ++this.iteration;
          this.loss = loss;
        });
      }
    });
  }
  public ngAfterViewInit() {
    this.ngOnInit();
    console.log(webkitURL);
    if ( navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
        this.video.nativeElement.srcObject = stream;
        this.video.nativeElement.play();
      });
    }
  }

  public capture() {
    const context = this.canvas.nativeElement.getContext('2d').drawImage(this.video.nativeElement, 0, 0, 320, 240);
    this.captures.push(this.canvas.nativeElement.toDataURL('image/png'));
  }

  gotResults(err: any, results: any) {
    if (err) {
      console.log(err);
    } else {
      this.zone.run(() => {
        this.label = results[0].label;
        this.confidence = results[0].confidence;
      });
      this.mobileNetFeatureExtractor.classify((e: any, r: any) => {
        this.gotResults(e, r);
      });
    }
  }

}
