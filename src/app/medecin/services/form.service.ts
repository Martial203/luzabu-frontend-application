import { Injectable } from '@angular/core';
import { WebcamImage } from 'ngx-webcam';
import { MedecinService } from './medecin.service';
import { PatientService } from './patient.service';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private patientService: PatientService, private medecinService: MedecinService) { }

  addHeaders(object: any): any{
    const headers = {
      idPatient: this.patientService.getPatientId(),
      idMedecin: this.medecinService.getMedecinId(),
      hopital: this.medecinService.getHospital(),
      time: new Date()
    }
    return {...object, ...headers};
  }

  toFile(webcamImage: WebcamImage, imageName: string, imageFormat: string): File{
    const arr = webcamImage.imageAsDataUrl.split(",");
    const mime = arr[0].match(/:(.*?);/)![1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    const file: File = new File([u8arr], imageName, { type: imageFormat })
    console.log(file);
    return file;
  }

  toFormData(object: any){
    let formData = new FormData();
    Object.keys(object).forEach(key => {
      formData.append(key, object[key]);
    })
  }
}
